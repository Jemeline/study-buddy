import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
  FormGroup,FormFeedback,Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiLogin} from '../utils/api';
import {getUser,login, validateEmail,validatePassword,getIsVerified} from '../utils/common';


function Login(){
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertMessageLogin, setAlertMessageLogin] = useState('');
  const history = useHistory();

  return <div> 
      <Container style={{width:"40%", margin: "auto"}} >     
        <Card bg="light" style={{ borderRadius: 8}}>
          <Card.Header><h4>Sign In</h4></Card.Header>
          <Row>
            <Col>
              <Card.Body>
                <Container>
                  <Col>
                  <Alert variant="danger" show={alertLogin} onClose={() => setAlertLogin(false)} dismissible transition={false}>
                    {alertMessageLogin}
                  </Alert>
                  </Col>
                  <Form className="form">
                      <Col>
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
                      </Col>
                      <Col>
                          <FormGroup>
                          <Input
                              type="password"
                              name="passwordLogin"
                              placeholder="Password"
                              onChange={(e) => setPasswordLogin(e.target.value)}
                              invalid={ passwordLogin.length > 0 && !validatePassword(passwordLogin)} 
                              valid={validatePassword(passwordLogin)}
                          />
                          </FormGroup>
                      </Col>
                      <Button
                        size="lg"
                        color="secondary"
                        disabled={
                          !(validateEmail(emailLogin))
                          ||!(emailLogin.length > 0)
                          ||!(validatePassword(passwordLogin))} 
                        onClick={async () => {await handleLogin(emailLogin,passwordLogin,history,setAlertLogin,setAlertMessageLogin);}}
                      > Sign In</Button>
                      <br></br>   
                  </Form>
                  </Container>
              </Card.Body>
            </Col>
          </Row>
          </Card>
          Don't have an account? <Link to="/register">Register here</Link><br></br>  
          <Link to="/recover">Forgot password? </Link>
      </Container>
  </div>
};


async function handleLogin(emailLogin,passwordLogin,history,setAlertLogin,setAlertMessageLogin){
  try{
    setAlertLogin(false);
    if (!emailLogin||!passwordLogin){
      setAlertLogin(true);
      setAlertMessageLogin("Please fill in all required fields");
    }
    if (!getUser()){
      const body = {"email":emailLogin,"password":passwordLogin}
      const data = await apiLogin(body);
      login(data.data.user,data.data.user.role,data.data.user.isVerified);
      if(!getIsVerified()){
        history.push('/verify');
      } else {
        history.push(`/dashboard/${data.data.user.role}`);
      }  
    } else {
      setAlertLogin(true);
      setAlertMessageLogin("Please Logout First");
    }  
  } catch (error){
    if (error.response.status === 401){
      setAlertLogin(true);
      setAlertMessageLogin(error.response.data.msg);
    } else {
      setAlertLogin(true);
      setAlertMessageLogin("Oops... Something Went Wrong");
    } 
  };
};

export default Login;