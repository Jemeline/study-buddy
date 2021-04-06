import React from "react";

const TutorAd = ({ tutorEmail, text, courses }) => {
    return (
        <div>
            <p>Tutor Email: {tutorEmail}</p>
            <p>Text: {text}</p>
            <p>Courses: {courses}</p>
        </div>
    );
};

export default TutorAd;
