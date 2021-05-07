/* Author: Jada Pfeiffer
Purpose: Component used for user sign in. Form feedback notifies user if
email format is invalid. Several alerts will also display conditionally for
incorrect credentials, if user is already logged in, etc.
Redirects user to VerifyAccount component if user has not verified email
or Dashboard if user has verified email
Route: https://study-buddy-d452c.web.app/auth
*/
import React, {useState} from 'react';
import {Button,Col,Container,Form,
  FormGroup,FormFeedback,Input} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiLogin} from '../../utils/api';
import {getUser,login,getIsVerified,logout} from '../../utils/common';
import {validateEmail} from '../../utils/regex';
import {colorPalette} from '../../utils/design';
import logo from '../study-buddy-tagline.png';

function Login({setIsLoggedIn,setTab,setFirst,setEmail,setId}){
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

  return <div className="Login" data-testid="Login"> 
      <Container style={{width:'35vw',margin: "auto"}} >     
        <Col>
          <img src={logo} alt="logo" style={{height: '35vh'}}/>
          <br/><br/>
            <Alert data-testid="login-alert-incomplete-creds" style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertLogin} onClose={() => setAlertLogin(false)} dismissible transition={false}>
                {alertMessageLogin}
            </Alert>
            <Alert data-testid="login-alert-invalid-creds" style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertInvalidLoginCreds} onClose={() => setAlertInvalidLoginCreds(false)} dismissible transition={false}>
                We can't find that username and password. You can <Link to="/auth" onClick={()=>{setTab('recover')}}>reset your password</Link> or try again. 
            </Alert>
            <Alert data-testid="login-alert-3" style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertAlreadyLoggedIn} onClose={() => setAlertAlreadyLoggedIn(false)} dismissible transition={false}>
                Please <Link to="/auth" onClick={()=>{setAlertAlreadyLoggedIn(false);logout()}}>Logout</Link> or <Link to="/dashboard/student">Go To Your Dashboard</Link>
            </Alert>
              <Form className="form">
                <FormGroup>
                  <Input
                    data-testid="login-email-input"
                    type="email"
                    name="Email"
                    placeholder="Email"
                    onChange={(e) => setEmailLogin(e.target.value)}
                    valid={ validateEmail(emailLogin) }
                    invalid={ emailLogin.length > 0 && !validateEmail(emailLogin)}
                    style={{borderRadius:14}}
                    value={emailLogin}
                  />
                  <FormFeedback data-testid="login-form-feedback">
                      There is an issue with your email. Please input a correct email.
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                      data-testid="login-password-input"
                      type="password"
                      name="passwordLogin"
                      placeholder="Password"
                      onChange={(e) => setPasswordLogin(e.target.value)}
                      style={{borderRadius:14}}
                      value={passwordLogin}
                  />
                </FormGroup>
                </Form>
                <Button
                  data-testid="login-button"
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
                      setAlertMessageLogin,setAlertInvalidLoginCreds,setIsLoggedIn,setLoadingLogin,setAlertAlreadyLoggedIn,
                      dismissAlerts,setFirst,setEmail,setId,setTab);
                  }}
                  style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,fontSize:'1.5vw'}}                                                                                                                
                > Sign In</Button>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <ReactLoading hidden={!loadingLogin} type={"cylon"} color={colorPalette.secondary} height={'10%'} width={'10%'} /> 
                </div>
              <br/>
              Don't Have an Account?
              <Link style={{marginLeft:'5px'}} to="/auth" onClick={()=>{setTab('register')}}>Sign Up Now</Link>
              <br/>
              <Link to="/auth" onClick={()=>{setTab('recover')}}>Forgot Password?</Link>
          </Col>  
      </Container>  
  </div>
};

async function handleLogin(emailLogin,passwordLogin,history,setAlertLogin,
  setAlertMessageLogin,setAlertInvalidLoginCreds,setIsLoggedIn,setLoadingLogin,setAlertAlreadyLoggedIn,dismissAlerts,
  setFirst,setEmail,setId,setTab){
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
          setFirst(data.data.user.first);
          setEmail(data.data.user.email);
          setId(data.data.user._id);
          setTab('verify');
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