import React, {useState} from 'react';
import {Button,Col,Container,Form,FormGroup,FormFeedback,Input} from 'reactstrap';
import logo from './study-buddy-tagline.png';
import books from './dark-background-1.jpeg'
import {Link} from 'react-router-dom';

function Home({}){
  return <Container>
    <Col style={{backgroundImage:books}}>
    </Col>
    <Col xs={6}>
      <img src={logo} alt="logo" style={{height: '35vh'}}/>
      <h4>Home</h4>
      <p>This is the Home Page.</p>
      <Link to="/auth">Login/Register</Link>
    </Col>
    <Col></Col>
      
    </Container>
};
 
export default Home;