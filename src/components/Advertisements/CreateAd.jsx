import React, { useState } from "react";
import { colorPalette } from "../../utils/design";
import { Container, Form, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import { getUser } from "../../utils/common";
import { createAd } from "../../utils/api";

const CreateAd = () => {
    const [text, setText] = useState("");
    const [courses, setCourses] = useState("");
    const [loading, setLoading] = useState(false);

    const submitForm = async e => {
        e.preventDefault();
        if (!text || !courses) {
            alert("Please fill in all fields");
        } else {
            const { email, first, last } = JSON.parse(getUser());
            try {
                setLoading(true);
                const res = await createAd({
                    tutorEmail: email,
                    text: text,
                    courses: courses,
                    first: first,
                    last: last,
                    ratings: []
                });
                // console.log(res);
                setLoading(false);
                alert("Successfully posted advertisement.");
                window.location.reload();
                return res;
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Container>
            <Form onSubmit={submitForm}>
                <Form.Row>
                    <Form.Group>
                        <h4>Create Advertisement</h4>
                        <Form.Control
                            style={{ width: "40vw" }}
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
                            style={{ width: "40vw" }}
                            rows={3}
                            as="textarea"
                            placeholder="Enter the courses you would like to tutor."
                            onChange={e => setCourses(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    {loading ? (
                        <ReactLoading type={"cylon"} color={colorPalette.secondary} />
                    ) : (
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    )}
                </Form.Row>
            </Form>
        </Container>
    );
};

export default CreateAd;
