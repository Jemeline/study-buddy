import React from "react";
import { Row, Col } from "react-bootstrap";
import TutorAd from "./TutorAd";

// List of Tutor Advertisements
// list: [ {"_id": 0, 
//     "tutorEmail": "tutor@email.com", 
//     "text": "ad text", 
//     "courses": "COMP-523, COMP-110"} ]
const TutorAdList = ({ isTutor, list }) => {
    return list.map(item => 
        <Row key={item._id}><Col>
            <TutorAd isTutor={isTutor} ad={item} />
        </Col></Row>
    );
};

export default TutorAdList;
