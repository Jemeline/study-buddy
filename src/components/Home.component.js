import React, {useState} from 'react';
import background from './Authentication/dark-background.jpg';
import Login from './Authentication/Login.component';
import Register from './Authentication/Register.component';
import logo from './study-buddy-tagline.png';
import {logout} from '../utils/common';
import RecoverPassword from './Authentication/RecoverPassword.component';


function Home({setIsLoggedIn,setIsHome}){
  const [tab,setTab] = useState('login');
  setIsHome(true);
  return <div style={{backgroundImage: `url(${background})`,minHeight:'100%',minWidth:'1024px',width:'100%',height:'auto',position:'fixed',top:0,left:0}}>
      <div style={{float:'right', width:'60%', minHeight:'100%',height:'auto',position:'fixed',top:0,right:0}}>
        <h4>Home</h4>
        <p>This is the Home Page.</p>   
      </div>
      <div style={{float:'left', width:'40%', backgroundColor:'white',minHeight:'100%',height:'auto',position:'fixed',top:0,left:0}}>
          <div style={{margin:'auto',alignItems: 'center',display:'flex',justifyContent:'center',height:'100vh',overflow:'auto'}}>
            {(tab==='login') ? <Login setIsLoggedIn={setIsLoggedIn} setTab={setTab}/> 
            : (tab==='register') ? <Register setIsLoggedIn={setIsLoggedIn} setTab={setTab}/>
            : <RecoverPassword setTab={setTab}/>}  
          </div>
      </div>
    </div>
};
 
export default Home;