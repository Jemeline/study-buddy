import React, {useState} from 'react';
import {Row, Button,Col,Container,Form,FormGroup,FormFeedback,Input} from 'reactstrap';
import logo from './study-buddy-tagline.png';
import books from './dark-background-1.jpeg';
import students from './students-background-1.jpeg'
import {Link} from 'react-router-dom';
import {colorPalette} from '../utils/design';
import './Home.css'

function Home({}){
  return (
  <div>
    
    <div style={{float:'left',backgroundImage: `url(${students})`,postion: 'relative', height:'100vh',width:'160vh',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed'}}>
    <Container>
      <div className='animate' style={{float:'right', backgroundColor: colorPalette.secondary, width:'40vw',height:'16vw', position: 'center', marginTop:'380px'}}>
          <p style={{fontSize: '22px', color:'white'}}>Study Buddy is a tool used by students to help them form their own study 
            groups. We make it easy to find fellow peers with similar study habits and 
            class schedules, so that you can focus more on studying.
          </p>
      </div>

    </Container>
    </div>
    <div style={{float:'right',backgroundImage: `url(${books})`,height:'100vh',width:'40vw',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed'}}/>
    
    <Container>
    <div style={{float:'center', position:'absolute', backgroundColor: 'white', width:'30vw',height:'100vh'}}>
      <img src={logo} alt="logo" style={{height: '45vh', marginTop: '90px'}}/>
      <Button to="/auth" style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'50%',borderRadius:14, marginTop: '50px'}}>Login/Register</Button>
    </div>
    </Container>
    
  </div>
  
  )
};
 
export default Home;