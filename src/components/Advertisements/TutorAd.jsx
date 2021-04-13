import React from "react";
import { Card } from "react-bootstrap";
// import { Button } from "react-bootstrap";

const TutorAd = ({ tutorEmail, text, courses }) => {
    return (
        <Card>
            <p>Email: {tutorEmail}</p>
            <p>Courses: {courses}</p>
            <p>{text}</p>
            {/* <Button variant="danger">Delete</Button> */}
        </Card>
    );
};

export default TutorAd;
