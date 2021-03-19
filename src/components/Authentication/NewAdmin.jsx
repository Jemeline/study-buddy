import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { withFirebase } from "../../utils/Firebase.js";

const NewAdmin = ({ Firebase }) => {

    const handleCreateAdmin = async e => {
        e.preventDefault();
        const { email, password, confirmPass } = e.target.elements;
        if (!email.value || !password.value || !confirmPass.value) {
            return alert("Please enter all fields");
        }

        if (password.value !== confirmPass.value) {
            return alert("Password is not the same as confirm password");
        } else {
            try {
                const user = await Firebase.addAdmin(email.value, password.value);
                console.log(user);
                return alert("Admin created- check console.");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container className="newAdminContainer">
            <Form className="NewAdminForm" onSubmit={handleCreateAdmin}>
                <h1>New Admin</h1>

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
                <Button type="submit">Create Admin</Button>
            </Form>
        </Container>
    );
};

export default withFirebase(NewAdmin);