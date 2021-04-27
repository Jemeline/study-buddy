import React, { useState } from "react";
import { Card, Form, Container } from "react-bootstrap";
import "./TutorAd.css";
import { colorPalette } from "../../utils/design";
import { Button, ButtonGroup } from "react-bootstrap";
import { editAd, deleteAd } from "../../utils/api";

const TutorAd = ({ isTutor, ad }) => {
    const [editMode, setEditMode] = useState(false);
    const [courses, setCourses] = useState(ad.courses);
    const [text, setText] = useState(ad.text);
    const style = {
        "backgroundColor": colorPalette.secondaryA,
        "color": colorPalette.white,
        "margin": "10px",
    };
    const handleSubmitEdit = async e => {
        try {
            e.preventDefault();
            await editAd({
                "_id": ad._id, 
                "tutorEmail": ad.tutorEmail,
                "text": text,
                "courses": courses
            });
            window.location.reload();
        } catch(err) {
            console.error(err);
        }
    }
    const handleDelete = async e => {
        try {
            e.preventDefault();
            const res = await deleteAd(ad._id);
            if(res.status === 200) {
                // alert("Ad deleted");
                window.location.reload();
            } else {
                console.log(res);
                alert("Something went wrong");
            }
        } catch(err) {
            console.error(err);
        }
    }
    return editMode ? 
    <Card className={"shadow"} style={style}>
        <Form onSubmit={handleSubmitEdit}>
            <Form.Control
                as="textarea"
                rows={4}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <Form.Control
                as="textarea"
                value={courses}
                onChange={e => setCourses(e.target.value)}
            />
            <ButtonGroup style={{"marginBottom": "5vh"}}>
                <Button variant="primary" type="submit">Submit</Button>
                <Button variant="danger" data-testid="deleteBtn" onClick={handleDelete}>Delete Ad</Button>
                <Button variant="danger" onClick={e => {
                    setText(ad.text);
                    setCourses(ad.courses);
                    setEditMode(false);
                }}>Cancel</Button>
            </ButtonGroup>
        </Form>
    </Card> 
    : <Card className={"shadow"} style={style}>
        <p>{ad.text}</p>
        <p>Courses: {ad.courses}</p>
        {isTutor ? null : <p>Email: {ad.tutorEmail}</p>}
        {isTutor ? <Container>
            <Button variant="primary" style={{"marginBottom": "5vh"}} data-testid="editBtn" onClick={e => setEditMode(true)}>Edit</Button>
        </Container> : null}
    </Card>;
};

export default TutorAd;
