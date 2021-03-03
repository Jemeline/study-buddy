import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
  FormGroup, Input,FormFeedback} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiRegister} from '../utils/api';
import {getUser,login, getIsVerified, validateEmail} from '../utils/common';


function Register(){
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [passwordConfirmRegister, setPasswordConfirmRegister] = useState('');
  const [firstNameRegister, setFirstNameRegister] = useState('');
  const [lastNameRegister, setLastNameRegister] = useState('');
  const [roleRegister, setRoleRegister] = useState('student');
  
  const [alertRegister, setAlertRegister] = useState(false);
  const [alertMessageRegister, setaAlertMessageRegister] = useState('');
  
  const [emailValidRegister,setEmailValidRegister] = useState('');
  const [passwordConfirmValidRegister,setPasswordConfirmValidRegister] = useState(false);
  const history = useHistory();

  return <div> 
      <Container style={{width:"40%", position:"absolute",top: "35%", bottom: 0, left: 0, right: 0,margin: "auto"}} >     
        <Card bg="light" style={{ borderRadius: 8 , opacity:.8, color:"white"}}>
          <Row>
            <Col>
              <Card.Body>
                <br></br>
                  <Alert variant="danger" show={alertRegister} onClose={() => setAlertRegister(false)} dismissible transition={false}>
                    {alertMessageRegister}
                  </Alert>
                <Container>
                  <Form className="form">
                      <Col>
                          <FormGroup>
                          <Input
                              type="email"
                              name="Email"
                              placeholder="Email"
                              onChange={(e) => {
                                validateEmail(e,setEmailValidRegister)
                                setEmailRegister(e.target.value)}}
                              valid={ emailValidRegister === 'valid' }
                              invalid={ emailValidRegister === 'invalid' }
                              />
                              <FormFeedback>
                                There is an issue with your email. Please input a correct email.
                              </FormFeedback>
                          </FormGroup>
                      </Col>
                      <Col>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Input type="text" name="firstnameRegister" placeholder="First Name" valid={ firstNameRegister.length !== 0 } onChange={(e) => setFirstNameRegister(e.target.value)}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Input type="text" name="lastnameRegister" placeholder="Last Name" valid={ lastNameRegister.length !== 0 } onChange={(e) => setLastNameRegister(e.target.value)}/>
                            </FormGroup>
                            </Col>
                        </Row>
                      </Col>
                      <Col>
                        <FormGroup>
                            <Input
                              type="password" 
                              name="passwordRegister"
                              placeholder="Password"
                              invalid={ passwordRegister.length > 0 && passwordRegister.length < 8 } 
                              valid={passwordRegister.length >= 8}
                              onChange={(e) => setPasswordRegister(e.target.value)}/>
                            <FormFeedback>
                                Your password must be 8 characters or longer
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Input
                              type="password" 
                              name="passwordConfirm" 
                              placeholder="Confirm Password" 
                              invalid={(passwordRegister)!==(passwordConfirmRegister)&& passwordConfirmRegister.length > 0}
                              valid={(passwordRegister)===(passwordConfirmRegister) && passwordConfirmRegister.length > 0}
                              onChange={(e) => {
                                setPasswordConfirmRegister(e.target.value);
                                validatePassword(passwordRegister,e.target.value,setPasswordConfirmValidRegister)
                              }}
                            />
                            <FormFeedback>
                                Passwords do not match
                            </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input type="select" name="select" id="exampleSelect" onChange={(e) => {setRoleRegister(e.target.value)}}>
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Button 
                        size="lg" 
                        color="secondary" 
                        disabled={!passwordConfirmValidRegister||!(emailValidRegister === 'valid')||!(lastNameRegister.length !== 0) || !(firstNameRegister.length !== 0)} 
                        onClick={async () => {await handleRegister(emailRegister,passwordRegister,passwordConfirmRegister,
                          firstNameRegister,lastNameRegister,roleRegister,
                          history,setAlertRegister,setaAlertMessageRegister);}}>
                          Register
                      </Button>
                      <br></br>   
                  </Form>
                  </Container>
              </Card.Body>
            </Col>
          </Row>
          </Card>
          Already have an account? <Link to="/login">Sign in here</Link><br></br>
      </Container>
  </div>
};


async function handleRegister(emailRegister,passwordRegister,passwordConfirmRegister,
  firstNameRegister,lastNameRegister,roleRegister,
  history,setAlertRegister,setAlertMessageRegister){
  try{
    setAlertRegister(false);
    if (!emailRegister||!passwordRegister||!passwordConfirmRegister||!firstNameRegister||!lastNameRegister||!roleRegister){
      setAlertRegister(true);
      setAlertMessageRegister("Please fill in all fields");
    }
    if (!getUser()){
      const body = {
        "email":emailRegister,
        "password":passwordRegister,
        "role":roleRegister,
        "first":firstNameRegister,
        "last":lastNameRegister
      };
      const data = await apiRegister(body);
      if (!data){
        setAlertRegister(true);
        setAlertMessageRegister("Oops... Something Went Wrong");
      } else {
        login(data.data.user,data.data.user.role,data.data.user.isVerified);
        if(!getIsVerified()){
          history.push('/verify');
        } else {
          history.push(`/dashboard/${data.data.user.role}`);
        }  
      }
    } else {
      setAlertRegister(true);
      setAlertMessageRegister("You are Already Logged In");
    }  
  } catch (error){
    if (error.response.status === 401){
      setAlertRegister(true);
      setAlertMessageRegister(error.response.data.msg);
    } else {
      setAlertRegister(true);
      setAlertMessageRegister("Oops... Something Went Wrong");
    } 
  };
};

function validatePassword(passwordRegister,passwordConfirmRegister,setPasswordConfirmValidRegister) {
    if ((passwordRegister)===(passwordConfirmRegister) && passwordConfirmRegister.length > 0){
      setPasswordConfirmValidRegister(true);
    } else {
      setPasswordConfirmValidRegister(false);
    }
};

export default Register;