import React, {useState} from 'react';
import {Button,Col,Container,Form,
  FormGroup,FormFeedback,Input} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Alert,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiLogin} from '../../utils/api';
import {getUser,login,getIsVerified} from '../../utils/common';
import {validateEmail} from '../../utils/regex';
import {colorPalette} from '../../utils/design';


function Login({setIsLoggedIn}){
  const [emailLogin, setEmailLogin] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [passwordLogin, setPasswordLogin] = useState('');
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertInvalidLoginCreds, setAlertInvalidLoginCreds] = useState(false);
  const [alertMessageLogin, setAlertMessageLogin] = useState('');
  const history = useHistory();

  return <div> 
      <Container style={{width:"35%", margin: "auto"}} >     
        <Card bg="light" style={{ borderRadius: 8}}>
          <Card.Header>
            <h4>Sign In</h4>
          </Card.Header>
          <Col>
              <Card.Body>
                  <Alert variant="danger" show={alertLogin} onClose={() => setAlertLogin(false)} dismissible transition={false}>
                    {alertMessageLogin}
                  </Alert>
                  <Alert variant="danger" show={alertInvalidLoginCreds} onClose={() => setAlertInvalidLoginCreds(false)} dismissible transition={false}>
                    We can't find that username and password. You can <Link to="/recover">reset your password </Link> or try again.
                  </Alert>
                  <Form className="form">
                      <FormGroup>
                          <Input
                              type="email"
                              name="Email"
                              placeholder="Email"
                              onChange={(e) => setEmailLogin(e.target.value)}
                              valid={ validateEmail(emailLogin) }
                              invalid={ emailLogin.length > 0 && !validateEmail(emailLogin) }
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
                          />
                          </FormGroup>
                      <Button
                        size="lg"
                        style={{backgroundColor:colorPalette.primary,color:colorPalette.white}}
                        type="submit"
                        hidden={loadingLogin}
                        disabled={
                          !(validateEmail(emailLogin))
                          ||!(emailLogin.length > 0)} 
                        onClick={async (e) => {
                          e.preventDefault();
                          setAlertLogin(false);
                          setAlertInvalidLoginCreds(false);
                          setLoadingLogin(true);
                          await handleLogin(emailLogin,passwordLogin,history,setAlertLogin,
                            setAlertMessageLogin,setAlertInvalidLoginCreds,setIsLoggedIn,setLoadingLogin);
                        }}
                      > Sign In</Button>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ReactLoading hidden={!loadingLogin} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                      </div>
                  </Form>
              </Card.Body>
              </Col>
          </Card>
          Don't have an account? <Link to="/register">Sign Up Now</Link><br></br>  
          <Link to="/recover">Forgot Password? </Link>
      </Container>
      
  </div>
};

async function handleLogin(emailLogin,passwordLogin,history,setAlertLogin,
  setAlertMessageLogin,setAlertInvalidLoginCreds,setIsLoggedIn,setLoadingLogin){
  try{
    if (!emailLogin||!passwordLogin){
      setAlertLogin(true);
      setAlertMessageLogin("Please fill in all required fields");
    }
    if (!getUser()){
      const body = {"email":emailLogin,"password":passwordLogin}
      const data = await apiLogin(body);
      login(data.data.user,data.data.user.role,data.data.user.isVerified);
      setIsLoggedIn(true);
      if(!getIsVerified()){
        history.push('/verify');
      } else {
        history.push(`/dashboard/${data.data.user.role}`);
      }  
    } else {
      setLoadingLogin(false);
      setAlertLogin(true);
      setAlertInvalidLoginCreds(false);
      setAlertMessageLogin("Please Logout First");
    }  
  } catch (error){
    setLoadingLogin(false);
    if (error.response.status === 401){
      setAlertLogin(false);
      setAlertInvalidLoginCreds(true);
    } else {
      setAlertLogin(true);
      setAlertInvalidLoginCreds(false);
      setAlertMessageLogin("Oops... Something Went Wrong");
    } 
  };
};

export default Login;