import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { withFirebase } from "../../utils/Firebase.js";

const Signup = ({ Firebase }) => {
    const [signedUp, setSignedUp] = useState(false);
    const handleSignup = async e => {
        e.preventDefault();
        const { email, password, confirmPass } = e.target.elements;

        if (password.value !== confirmPass.value) {
            alert("Password is not the same as confirm password");
        } else {
            try {
                const user = await Firebase.signup(email.value, password.value);
                console.log(user);
                setSignedUp(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container className="signupContainer">
            {signedUp ? <Redirect to="/student/dashboard" /> : null}
            <Form className="signupForm" onSubmit={handleSignup}>
                <h1>Signup</h1>

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
                <Form.Control
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                />
                <Button type="submit">Signup</Button>
            </Form>
        </Container>
    );
};

export default withFirebase(Signup);
