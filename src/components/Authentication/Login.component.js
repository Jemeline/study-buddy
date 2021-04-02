import React, {useState} from 'react';
import {Button,Col,Container,Form,
  FormGroup,FormFeedback,Input} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Alert,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiLogin} from '../../utils/api';
import {getUser,login,getIsVerified,getIsSurveyed, logout} from '../../utils/common';
import {validateEmail} from '../../utils/regex';
import {colorPalette} from '../../utils/design';
import logo from '../study-buddy-tagline.png';

function Login({setIsLoggedIn,setTab}){
  const [emailLogin, setEmailLogin] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [passwordLogin, setPasswordLogin] = useState('');
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertInvalidLoginCreds, setAlertInvalidLoginCreds] = useState(false);
  const [alertAlreadyLoggedIn, setAlertAlreadyLoggedIn] = useState(false);
  const [alertMessageLogin, setAlertMessageLogin] = useState('');
  const history = useHistory();

  const dismissAlerts= () => {
    setAlertLogin(false);
    setAlertAlreadyLoggedIn(false);
    setAlertInvalidLoginCreds(false);
    setAlertMessageLogin('');
  };

  return <div> 
      <Container style={{width:'35vw',margin: "auto"}} >     
        <Col>
          <img src={logo} style={{height: '35vh'}}/>
          <br/>
            <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertLogin} onClose={() => setAlertLogin(false)} dismissible transition={false}>
                {alertMessageLogin}
            </Alert>
            <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertInvalidLoginCreds} onClose={() => setAlertInvalidLoginCreds(false)} dismissible transition={false}>
                We can't find that username and password. You can <Link to="/recover">reset your password</Link> or try again. 
            </Alert>
            <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertAlreadyLoggedIn} onClose={() => setAlertAlreadyLoggedIn(false)} dismissible transition={false}>
                Please <Link to="/" onClick={()=>{setAlertAlreadyLoggedIn(false);logout()}}>Logout</Link> or <Link to="/dashboard/student">Go To Your Dashboard</Link>
            </Alert>
              <Form className="form">
                <FormGroup>
                  <Input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    onChange={(e) => setEmailLogin(e.target.value)}
                    valid={ validateEmail(emailLogin) }
                    invalid={ emailLogin.length > 0 && !validateEmail(emailLogin)}
                    style={{borderRadius:14}}
                  />
                  <FormFeedback>
                      There is an issue with your email. Please input a correct email.
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                      type="password"
                      name="passwordLogin"
                      placeholder="Password"
                      onChange={(e) => setPasswordLogin(e.target.value)}
                      style={{borderRadius:14}}
                  />
                </FormGroup>
                <Button
                  size="lg"
                  type="submit"
                  hidden={loadingLogin}
                  disabled={
                    !(validateEmail(emailLogin))
                    ||!(emailLogin.length > 0)} 
                  onClick={async (e) => {
                    e.preventDefault();
                    dismissAlerts();
                    setLoadingLogin(true);
                    await handleLogin(emailLogin,passwordLogin,history,setAlertLogin,
                      setAlertMessageLogin,setAlertInvalidLoginCreds,setIsLoggedIn,setLoadingLogin,setAlertAlreadyLoggedIn,dismissAlerts);
                  }}
                  style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'50%',borderRadius:14}}                                                                                                                
                > Sign In</Button>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <ReactLoading hidden={!loadingLogin} type={"cylon"} color={colorPalette.secondary} height={'10%'} width={'10%'} /> 
                </div>
              </Form>
              <br/>
              Don't Have an Account?
              <Link to="/" onClick={()=>{setTab('register')}}> Sign Up Now</Link>
              <br/>
              <Link to="/" onClick={()=>{setTab('recover')}}>Forgot Password?</Link>
          </Col>  
      </Container>  
  </div>
};

async function handleLogin(emailLogin,passwordLogin,history,setAlertLogin,
  setAlertMessageLogin,setAlertInvalidLoginCreds,setIsLoggedIn,setLoadingLogin,setAlertAlreadyLoggedIn,dismissAlerts){
  try{
    if (!emailLogin||!passwordLogin){
      dismissAlerts();
      setAlertLogin(true);
      setAlertMessageLogin("Please fill in all required fields");
      setLoadingLogin(false);
    } else {
      if (!getUser()){
        const body = {"email":emailLogin,"password":passwordLogin}
        const data = await apiLogin(body);
        login(data.data.user,data.data.user.role,data.data.user.isVerified,data.data.user.isSurveyed);
        if(!getIsVerified()){
          history.push('/verify');
        } else {
          setIsLoggedIn(true);
          history.push(`/dashboard/${data.data.user.role}`);
        }  
      } else {
        dismissAlerts();
        setAlertAlreadyLoggedIn(true);
        setLoadingLogin(false);
      }
    }
  } catch (error){
    console.log(error);
    setLoadingLogin(false);
    if (error.response.status === 401){
      dismissAlerts();
      setAlertInvalidLoginCreds(true);
    } else {
      dismissAlerts();
      setAlertLogin(true);
      setAlertMessageLogin("Oops... Something Went Wrong");
    } 
  };
};

export default Login;