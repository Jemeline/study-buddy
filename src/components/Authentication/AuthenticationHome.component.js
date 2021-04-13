import React, {useState} from 'react';
import background from './dark-background-1.jpeg';
import Login from './Login.component';
import Register from './Register.component';
import RecoverPassword from './RecoverPassword.component';
import VerifyAccount from './VerifyAccount.component';

function AuthenticationHome({setIsLoggedIn}){
  const [tab,setTab] = useState('login');
  const [email,setEmail] = useState('');
  const [first,setFirst] = useState('');
  const [id,setId] = useState('');

  return <div>
    <div style={{float:'right',backgroundImage: `url(${background})`,height:'100vh',width:'60vw',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed'}}/>
    <div style={{float:'right',width:'40vw',height:'100vh'}}>
        <div style={{marginTop:'5%',marginBottom:'5%',alignItems: 'center',display:'flex',justifyContent:'center',overflow:'auto'}}>
        {(tab==='login') ? <Login setIsLoggedIn={setIsLoggedIn} setTab={setTab} setFirst={setFirst} setEmail={setEmail} setId={setId}/> 
        : (tab==='register') ? <Register setIsLoggedIn={setIsLoggedIn} setTab={setTab} setFirst={setFirst} setEmail={setEmail} setId={setId}/>
        : (tab==='verify') ? <VerifyAccount setIsLoggedIn={setIsLoggedIn} setTab={setTab} first={first} email={email} id={id}/>
        : <RecoverPassword setTab={setTab}/>} 
        </div>
        <br/>
    </div>
  </div>
};
 
export default AuthenticationHome;