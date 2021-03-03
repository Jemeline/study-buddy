import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
  FormGroup, Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiLogin} from '../utils/api';
import {getUser,login} from '../utils/common';
// import loginImg from "../login.jpg";


function Login(){
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertMessageLogin, setaAlertMessageLogin] = useState('');
  const history = useHistory();

  // style={{position:"absolute", top:0, right:0, bottom:0, left:0,backgroundImage: "url(" + loginImg + ")",}}
  return <div> 
      <Container style={{width:"40%", position:"absolute",top: "35%", bottom: 0, left: 0, right: 0,margin: "auto"}} >     
        <Card bg="secondary" style={{ borderRadius: 8 , opacity:.8, color:"white"}}>
          <Row>
            <Col>
              <Card.Body>
                <br></br>
                  <Alert variant="danger" show={alertLogin} onClose={() => setAlertLogin(false)} dismissible transition={false}>
                    {alertMessageLogin}
                  </Alert>
                <Container>
                  <Form className="form">
                      <Col>
                          <FormGroup>
                          <Input
                              type="email"
                              name="Email"
                              placeholder="Email"
                              onChange={(e) => setEmailLogin(e.target.value)}
                          />
                          </FormGroup>
                      </Col>
                      <Col>
                          <FormGroup>
                          <Input
                              type="password"
                              name="passwordLogin"
                              placeholder="Password"
                              onChange={(e) => setPasswordLogin(e.target.value)}
                          />
                          </FormGroup>
                      </Col>
                      <Button size="lg" color="dark" onClick={async () => {await handleLogin(emailLogin,passwordLogin,history,setAlertLogin,setaAlertMessageLogin);}}>Sign In</Button>
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
    if (!getUser()){
      const body = {"email":emailLogin,"password":passwordLogin}
      const data = await apiLogin(body);
      if (!data){
        setAlertLogin(true);
        setAlertMessageLogin("We do not recognize your username and/or password");
      } else {
        login(data.data.user,data.data.user.role)
        history.push(`/dashboard/${data.data.user.role}`);
      }
    } else {
      setAlertLogin(true);
      setAlertMessageLogin("You are Already Logged In");
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