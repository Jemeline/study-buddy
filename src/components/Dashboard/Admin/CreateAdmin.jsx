import React, { useState } from "react";
import { Form, Container, Button, Card, Row, Col } from "react-bootstrap";
import { createAdmin } from "../../../utils/api";
import { colorPalette } from "../../../utils/design";

const CreateAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (
            email === "" ||
            password === "" ||
            confirmPass === "" ||
            first === "" ||
            last === ""
        ) {
            alert("Please fill in all fields.");
        } else if (password !== confirmPass) {
            alert("Password and Confirm Password are not equal.");
        } else {
            const data = {
                email: email,
                password: password,
                first: first,
                last: last
            };
            console.log(data);
            createAdmin(data)
                .then(res => {
                    // console.log(res.data);
                    alert("Admin created.");
                    window.location.reload();
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <Container>
            <h4>Create Admin</h4>
            <Card
                style={{
                    width: "80vw",
                    backgroundColor: colorPalette.secondaryA,
                    padding: "10px",
                    margin: "5vh",
                    color: colorPalette.white
                }}
                className="shadow"
            >
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            placeholder="Email Adress"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{width: "37vw", marginTop: "3vh"}}
                        />
                        <Row>
                            <Col>
                                <Form.Control
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={confirmPass}
                                    onChange={e => setConfirmPass(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control
                                    placeholder="First Name"
                                    value={first}
                                    onChange={e => setFirst(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="Last Name"
                                    value={last}
                                    onChange={e => setLast(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Button type="submit" style={{backgroundColor:colorPalette.secondary, marginTop: "2vh"}}>Submit</Button>
                    </Form>
                </Container>
            </Card>
        </Container>
    );
};

export default CreateAdmin;
