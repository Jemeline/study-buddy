import React, {useState} from 'react';
import {Button,Col,Container,Form,FormGroup,Input,FormFeedback} from 'reactstrap';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiResetPassword,apiVerifyResetPassword} from '../../utils/api';
import {getUser,logout} from '../../utils/common';
import ReactLoading from 'react-loading';
import {colorPalette} from '../../utils/design';
import logo from '../study-buddy-tagline.png';
import {validateEmail,validateResetToken,validatePassword,validatePasswordLiteral} from '../../utils/regex';

function RecoverPassword({setIsLoggedIn,setTab}){
    const history = useHistory();
    const [alertForgotPassword, setAlertForgotPassword] = useState(false);
    const [alertMessageForgotPassword, setAlertMessageForgotPassword] = useState('');
    const [loading,setLoading]=useState(false);
    const [step,setStep]=useState(0);
    const [email,setEmail]=useState('');
    const [token,setToken]=useState('');
    const [password,setPassword]=useState('');
    const [passwordConfirm,setPasswordConfirm]=useState('');
    const [alertAlreadyLoggedIn, setAlertAlreadyLoggedIn] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);

    const dismissAlerts= () => {
      setAlertForgotPassword(false);
      setAlertAlreadyLoggedIn(false);
      setAlertSuccess(false);
      setAlertMessageForgotPassword('');
    };

    return <div>
        <Container style={{width:'35vw',margin: "auto"}} >
              <Col>
                <img src={logo} style={{height: '30vh'}}/>
                <br/>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, fontSize:'15px'}} show={alertForgotPassword} onClose={() => setAlertForgotPassword(false)} dismissible transition={false}>
                {alertMessageForgotPassword}
                </Alert>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, fontSize:'15px'}} show={alertAlreadyLoggedIn} onClose={() => setAlertAlreadyLoggedIn(false)} dismissible transition={false}>
                    Please <Link to="/auth" onClick={()=>{setAlertAlreadyLoggedIn(false);logout()}}>Logout</Link> or <Link to="/dashboard/student">Go To Your Dashboard</Link>
                </Alert>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, fontSize:'15px'}} show={alertSuccess} onClose={() => setAlertSuccess(false)} dismissible transition={false}>
                    Success! You may <Link to="/auth" onClick={()=>{setTab('login')}}>Login</Link> now with your new credentials.
                </Alert>
                <div hidden={step !== 0}>
                    <h5>Recover Password</h5>
                    <p>Please enter your email below:</p>
                    <Form className="form" style={{margin: "auto"}}>
                    <FormGroup>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                            }}
                            valid={ validateEmail(email) }
                            invalid={ email.length > 0 && !validateEmail(email)}
                            style={{borderRadius:14,marginBottom:'0px'}}    
                        />
                        <Link style={{fontSize:'12px',marginTop:'0px',marginBottom:'5px'}} to="/auth" onClick={()=>{setStep(1);}}>I already have a token</Link>
                        <br/><br/>
                        <Button 
                          size="md"
                          style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,fontSize:'1.25vw'}} 
                          disabled={!(email.length > 0)}
                          onClick={async () => {
                              setLoading(true);
                              dismissAlerts();
                              await handleGetResetCode(email,setAlertAlreadyLoggedIn,setAlertForgotPassword,setAlertMessageForgotPassword,setStep);
                              setLoading(false);
                          }}
                        > Send A Reset Code
                        </Button>
                    </FormGroup> 
                </Form>
                </div>
                <div hidden={step !== 1}>
                    <p style={{margin:0,fontSize:'15px'}}>A reset token has been sent to:</p>
                    <p style={{margin:0,fontSize:'15px'}}><em>{email}</em></p>
                    <br/>
                    <Form className="form" style={{margin: "auto"}}>
                    <FormGroup>
                        <Input
                            type="text"
                            name="token"
                            placeholder="Reset Token"
                            value={token}
                            onChange={(e) => {
                              setToken(e.target.value)
                            }}
                            valid={ validateResetToken(token) }
                            invalid={ token.length > 0 && !validateResetToken(token) }
                            style={{borderRadius:14,marginBottom:'10px'}}    
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                            invalid={password.length > 0 && !validatePassword(password)} 
                            valid={validatePassword(password)}
                            style={{borderRadius:14,marginBottom:'0px'}}    
                        />
                        <FormFeedback>
                            {validatePasswordLiteral(password)}
                        </FormFeedback>
                        <Input
                            type="password"
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            onChange={(e) => {
                              setPasswordConfirm(e.target.value)
                            }}
                            invalid={passwordConfirm.length > 0 && (!validatePassword(passwordConfirm) || (password)!==(passwordConfirm))} 
                            valid={(password)===(passwordConfirm) && validatePassword(passwordConfirm)}
                            style={{borderRadius:14,marginBottom:'0px',marginTop:'10px'}}    
                        />
                        <FormFeedback>
                            Passwords do not match
                        </FormFeedback>
                        <Link style={{fontSize:'12px',marginTop:'0px',marginBottom:'5px'}} to="/auth" onClick={()=>{setStep(0);}}>I need a token</Link>
                        <br/><br/>
                        <Button 
                          size="md"
                          style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,fontSize:'1.25vw'}} 
                          disabled={!(password.length > 0) || !(passwordConfirm === password)}
                          onClick={async () => {
                              setLoading(true);
                              dismissAlerts();
                              await handleResetPassword(token,password,setAlertSuccess,setAlertForgotPassword,setAlertMessageForgotPassword,setAlertAlreadyLoggedIn);
                              setLoading(false);
                          }}
                        > Reset My Password
                        </Button>
                    </FormGroup> 
                </Form>
                </div>
            </Col>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading hidden={!loading} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                </div>
                <Link style={{marginLeft:'5px'}} to="/auth" onClick={()=>{setTab('login')}}>Sign In Now</Link>
        </Container>
        </div>
};

async function handleGetResetCode(email,setAlertAlreadyLoggedIn,setAlertForgotPassword,setAlertMessageForgotPassword,setStep){
  try{
      if (getUser()){
          setAlertAlreadyLoggedIn(true);
      } else {
          const data = await apiResetPassword(email);
          setStep(1);
      }  
    } catch (error){
      console.log(error);
      if (error.response.status === 401){
        setAlertForgotPassword(true);
        setAlertMessageForgotPassword("We were unable to find an account associated with this email.");
      } else {
        setAlertForgotPassword(true);
        setAlertMessageForgotPassword("Something went wrong... Please reach out for assistance using the Contact Us page.");
      }   
    };
};

async function handleResetPassword(token,password,setAlertSuccess,setAlertForgotPassword,setAlertMessageForgotPassword,setAlertAlreadyLoggedIn){
  try{
      if (getUser()){
        setAlertAlreadyLoggedIn(true);
      } else {
          const body = {"newPassword":password}
          const data = await apiVerifyResetPassword(token,body);
          setAlertSuccess(true);
      }  
    } catch (error){
      console.log(error);
      if (error.response.status === 401){
        setAlertForgotPassword(true);
        setAlertMessageForgotPassword("The reset token you have is invalid or expired. Please request a new token.");
      } else {
        setAlertForgotPassword(true);
        setAlertMessageForgotPassword("Something went wrong... Please reach out for assistance using the Contact Us page.");
      }   
    };
};

export default RecoverPassword;