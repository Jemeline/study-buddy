import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { withFirebase } from "../../utils/Firebase.js";

const Login = ({ Firebase }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogin = async e => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            const user = await Firebase.login(email.value, password.value);
            console.log(user);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="loginContainer">
            {loggedIn ? <Redirect to="/student/dashboard" /> : null}
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
