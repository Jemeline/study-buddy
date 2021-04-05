import React, {useState} from 'react';
import background from './dark-background-1.jpeg';
import Login from './Login.component';
import Register from './Register.component';
import RecoverPassword from './RecoverPassword.component';


function AuthenticationHome({setIsLoggedIn,setIsHome}){
  const [tab,setTab] = useState('login');
  setIsHome(true);
  return <div className='ah'>
    <div style={{float:'right',backgroundImage: `url(${background})`,height:'100vh',width:'60vw',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed'}}/>
    <div style={{float:'right',width:'40vw',height:'100vh'}}>
        <div style={{marginTop:'5%',marginBottom:'5%',alignItems: 'center',display:'flex',justifyContent:'center',overflow:'auto'}}>
        {(tab==='login') ? <Login setIsLoggedIn={setIsLoggedIn} setTab={setTab}/> 
        : (tab==='register') ? <Register setIsLoggedIn={setIsLoggedIn} setTab={setTab}/>
        : <RecoverPassword setTab={setTab}/>} 
        </div>
    </div>
  </div>
};
 
export default AuthenticationHome;