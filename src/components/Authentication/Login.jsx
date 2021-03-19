import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { withFirebase } from "../../utils/Firebase.js";

const Login = ({ Firebase }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [claim, setClaim] = useState(null);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const { email, password } = e.target.elements;
            if (!email.value || !password.value) return alert("Please fill in both fields.");

            const credential = await Firebase.login(email.value, password.value);
            console.log(credential);
            setLoggedIn(true);
            const claims = await Firebase.getClaims();
            if(claims.admin) {
                setClaim("admin");
            } else if (claims.tutor) {
                setClaim("tutor");
            } else if (claims.student) {
                setClaim("student");
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="loginContainer">
            {loggedIn && claim ? <Redirect to={`/${claim}/dashboard`} /> : null}
            <Form className="loginForm" onSubmit={handleLogin}>
                <h1>Firebase Login</h1>

                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email Address"
                />
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    );
};

export default withFirebase(Login);
