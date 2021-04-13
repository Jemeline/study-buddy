import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyAds from "../Advertisements/MyAds";
import CreateAd from "../Advertisements/CreateAd";
 
const TutorDashboard = () => (
    <Container>
      <h4>Tutor Dashboard</h4>
      <Row>
        <Col><MyAds /></Col>
        <Col><CreateAd /></Col>
      </Row>
    </Container>
);
 
export default TutorDashboard;