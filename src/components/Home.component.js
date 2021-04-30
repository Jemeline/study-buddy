import React, {useState} from 'react';
import {Row, Button,Col,Container,Form,FormGroup,FormFeedback,Input} from 'reactstrap';
import logo from './study-buddy-tagline.png';
import survey from './survey_home.png';
import students from './students-background-1.jpeg'
import {Link} from 'react-router-dom';
import {colorPalette} from '../utils/design';
import './Home.css';
import { useHistory } from "react-router-dom";
import {getLoginStatus} from '../utils/common';

function Home({}){
  const history = useHistory();
  return (
  <div>
    <div style={{float:'left',backgroundImage: `url(${students})`,postion: 'relative', height:'100vh',width:'65vw',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',overflow:'auto'}}>
      <div className='animate' style={{float:'right', backgroundColor: colorPalette.secondary,position: 'center',marginTop:'100px',opacity:0.85}}>
          <p style={{fontSize: '22px', color:'white',}}>
          Study Buddy helps students at UNC connect with each other to find their ideal study partners
          </p>
      </div>
      <div className='animate' style={{float:'left', backgroundColor: colorPalette.secondary,position: 'center',marginTop:'400px',opacity:0.85}}>
          <p style={{fontSize: '22px', color:'white',}}>
          We make it easy for you to find fellow peers with similar study habits and 
          class schedules, so that you can focus more on studying the right way with the right people
          </p>
      </div>
    </div>
    <div style={{float:'right',width:'35vw'}}>
      <img src={logo} alt="logo" style={{height: '45vh', width: '45vh',marginTop: '90px'}}/>
      <Button onClick={()=>history.push('/auth')} style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'50%',borderRadius:14, marginTop: '50px'}}>Login/Register</Button>
    </div>
  </div>
  
  )
};
 
export default Home;