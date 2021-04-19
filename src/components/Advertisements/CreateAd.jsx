import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getUser } from "../../utils/common";
import { createAd } from "../../utils/api";

const CreateAd = () => {
    const [text, setText] = useState("");
    const [courses, setCourses] = useState("");
    const [loading, setLoading] = useState(false);

    const submitForm = async e => {
        const { email } = JSON.parse(getUser());
        const data = {
            tutorEmail: email,
            text: text,
            courses: courses
        };
        try {
            setLoading(true);
            const res = await createAd(data);
            // console.log(res);
            setLoading(false);
            alert("Successfully posted advertisement.");
            return res;
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Form onSubmit={submitForm}>
                <Form.Row>
                    <Form.Group>
                        <h4>Create Advertisement</h4>
                        <Form.Control
                            style={{"width": "40vw"}}
                            rows={3}
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
                            style={{"width": "40vw"}}
                            rows={3}
                            as="textarea"
                            placeholder="Enter the courses you would like to tutor."
                            onChange={e => setCourses(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    {loading ? "Loading..." 
                        : <Button variant="primary" type="submit">Submit</Button>
                    }
                </Form.Row>
            </Form>
        </Container>
    );
};

export default CreateAd;
