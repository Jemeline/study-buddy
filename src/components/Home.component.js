import React, {useState} from 'react';
import {Row, Button,Col,Container,Form,FormGroup,FormFeedback,Input} from 'reactstrap';
import logo from './study-buddy-tagline.png';
import books from './dark-background-1.jpeg';
import students from './students-background-1.jpeg'
import {Link} from 'react-router-dom';
import {colorPalette} from '../utils/design';
import './Home.css';
import { useHistory } from "react-router-dom";
import {getLoginStatus} from '../utils/common';

function Home({}){
  const history = useHistory();
  return (
  <div data-testid='Home'>
    <div style={{float:'left',backgroundImage: `url(${students})`,postion: 'relative', height:'100vh',width:'70vw',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',overflow:'auto'}}>
      <div className='animate' style={{float:'right', backgroundColor: colorPalette.secondary,position: 'center', marginTop:'400px'}}>
          <p style={{fontSize: '22px', color:'white'}}>
            Study Buddy is a tool used by UNC students to help them form their own study 
            groups. We make it easy for you to find fellow peers with similar study habits and 
            class schedules, so that you can focus more on studying the right way with the right people.
          </p>
      </div>
    </div>
    <div style={{float:'right',width:'30vw'}}>
      <img src={logo} alt="logo" style={{height: '45vh', width: '45vh',marginTop: '90px'}}/>
      <Button data-testid='Login-Register' onClick={()=>history.push('/auth')} style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'50%',borderRadius:14, marginTop: '50px'}}>Login/Register</Button>
    </div>
  </div>
  
  )
};
 
export default Home;