import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
const axios = require("axios");

const CreateAd = () => {
    const [tutorEmail, setTutorEmail] = useState("");
    const [text, setText] = useState("");
    const [courses, setCourses] = useState("");

    const submitForm = async e => {
        e.preventDefault();
        const data = {
            tutorEmail: tutorEmail,
            text: text,
            courses: courses
        };
        const res = await axios
            .post("https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/advertisement", data)
            .catch(err => console.error(err));
        console.log(res);
        return res;
    };

    return (
        <Container id="create_ad">
            <Form onSubmit={submitForm}>
                <Form.Row>
                    <Form.Group as={Col} sm="auto">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter the email you would like students to contact you at."
                            onChange={e => setTutorEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm="auto">
                        <Form.Label>Advertisement</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the text of your advertisement."
                            onChange={e => setText(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm="auto">
                        <Form.Label>Courses</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the courses you would like to tutor."
                            onChange={e => setCourses(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default CreateAd;
