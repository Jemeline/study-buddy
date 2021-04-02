import React from 'react';
import {Link} from 'react-router-dom';

function RecoverPassword({setTab}){
  return <div>
      <h4>Recover Password</h4>
      <p>This is the Recover Password Page.</p>
      <Link to="/" onClick={()=>{setTab('register')}}> Sign Up Now</Link>
      <Link to="/" onClick={()=>{setTab('login')}}> Sign In Now</Link>
    </div>
};
 
export default RecoverPassword;