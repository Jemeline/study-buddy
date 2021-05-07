import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyAds from "../Advertisements/MyAds";
import CreateAd from "../Advertisements/CreateAd";
import { colorPalette } from "../../utils/design";
 
const TutorDashboard = () => (
  <div data-testid='Tutor-Dashboard' style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
    <br/>
      <Row>
        <Col lg><MyAds/></Col>
      </Row>
  </div>
);
 
export default TutorDashboard;