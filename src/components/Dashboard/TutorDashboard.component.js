import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyAds from "../Advertisements/MyAds";
import CreateAd from "../Advertisements/CreateAd";
 
const TutorDashboard = () => (
    <Container data-testid="tutorDash" style={{"marginBottom": "5vh"}}>
      <h4>Tutor Dashboard</h4>
      <Row>
        <Col lg><CreateAd /></Col>
        <Col lg><MyAds /></Col>
      </Row>
    </Container>
);
 
export default TutorDashboard;