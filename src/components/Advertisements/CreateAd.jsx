import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { getUser } from "../../utils/common";
const axios = require("axios");

const CreateAd = () => {
    const [text, setText] = useState("");
    const [courses, setCourses] = useState("");

    const submitForm = async e => {
        e.preventDefault();
        const { email } = JSON.parse(getUser());
        const data = {
            tutorEmail: email,
            text: text,
            courses: courses
        };
        // const base = "http://localhost:5001/study-buddy-d452c/us-central1/app8/api";
        const base = "https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api"
        const res = await axios
            .post(`${base}/advertisement`, data)
            .catch(err => console.error(err));
        // console.log(res);
        alert("New advertisement posted!");
        return res;
    };

    return (
        <Container id="create_ad">
            <Form onSubmit={submitForm}>
                <Form.Row>
                    <Form.Group>
                        <h4>New Advertisement</h4>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter the text of your advertisement."
                            onChange={e => setText(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>Courses</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter the courses you would like to tutor."
                            onChange={e => setCourses(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Row>
            </Form>
        </Container>
    );
};

export default CreateAd;
