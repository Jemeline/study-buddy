import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Home({setIsLoggedIn,setIsHome}){
  setIsHome(true);
  return <div>
      <h4>Home</h4>
      <p>This is the Home Page.</p>
      <Link to="/auth">Login/Register</Link>
    </div>
};
 
export default Home;