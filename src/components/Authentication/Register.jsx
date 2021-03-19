import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { withFirebase } from "../../utils/Firebase.js";

const Register = ({ Firebase }) => {
    const [isStudent, setIsStudent] = useState(true);
    const [registered, setRegistered] = useState(false);

    const handleRegister = async e => {
        e.preventDefault();
        const { email, first, last, password, confirmPass } = e.target.elements;
        if (!email.value || !first.value || !last.value || !password.value || !confirmPass.value) {
            return alert("Please enter all fields");
        }

        if (password.value !== confirmPass.value) {
            return alert("Password is not the same as confirm password");
        } else {
            const data = {"email": email.value, "first": first.value, "last": last.value, "role": isStudent ? "student" : "tutor"};
            // console.log(data);
            const user = await Firebase.register(data, password.value).catch(err => console.error(err));
            console.log(user);
            return setRegistered(true);
        }
    };

    return (
        <Container className="registerContainer">
            {registered ? <Redirect to={`/${isStudent ? "student" : "tutor"}/dashboard`} /> : null}
            <Form className="registerForm" onSubmit={handleRegister}>
                <h1>Register</h1>

                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email Address"
                />
                <Form.Control
                    name="first"
                    type="text"
                    placeholder="First Name"
                />
                <Form.Control
                    name="last"
                    type="text"
                    placeholder="Last Name"
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
                <Form.Check 
                    type="switch"
                    id="role-switch"
                    label="Tutor?"
                    onChange={() => setIsStudent(!isStudent)}
                />
                <Button type="submit">Signup</Button>
            </Form>
        </Container>
    );
};

export default withFirebase(Register);
