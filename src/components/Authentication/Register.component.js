import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
  FormGroup,FormText,Input,FormFeedback} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiRegister} from '../../utils/api';
import {getUser,login, getIsVerified} from '../../utils/common';
import {validatePassword,validatePhone,validateEmail,validatePasswordLiteral} from '../../utils/regex';


function Register(){
  const [emailRegister, setEmailRegister] = useState('');
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [passwordRegister, setPasswordRegister] = useState('');
  const [passwordConfirmRegister, setPasswordConfirmRegister] = useState('');
  const [firstNameRegister, setFirstNameRegister] = useState('');
  const [lastNameRegister, setLastNameRegister] = useState('');
  const [roleRegister, setRoleRegister] = useState('student');
  const [phoneRegister, setPhoneRegister] = useState('');
  const [alertRegister, setAlertRegister] = useState(false);
  const [alertMessageRegister, setAlertMessageRegister] = useState('');
  const history = useHistory();

  return <div> 
      <Container style={{width:"40%", margin: "auto"}} >     
        <Card bg="light" style={{ borderRadius: 8}}>
          <Card.Header><h4>Register</h4></Card.Header>
            <Col>
              <Card.Body>
                  <Alert variant="danger" show={alertRegister} onClose={() => setAlertRegister(false)} dismissible transition={false}>
                    {alertMessageRegister}
                  </Alert>
                  <Form className="form">
                    <FormGroup>
                      <Input
                          type="email"
                          name="Email"
                          placeholder="Email"
                          onChange={(e) => setEmailRegister(e.target.value)}
                          valid={validateEmail(emailRegister)}
                          invalid={emailRegister.length > 0 && !validateEmail(emailRegister)}
                          />
                          <FormFeedback>
                            There is an issue with your email. Please input a correct email.
                          </FormFeedback>
                    </FormGroup>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Input
                              type="text"
                              name="firstnameRegister"
                              placeholder="First Name"
                              invalid={firstNameRegister.length > 0 && /[^a-zA-Z]/.test(firstNameRegister)}
                              valid={firstNameRegister.length !== 0 && !/[^a-zA-Z]/.test(firstNameRegister)}
                              onChange={(e) => setFirstNameRegister(e.target.value)}/>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                              <Input
                              type="text"
                              name="lastnameRegister"
                              placeholder="Last Name"
                              invalid={lastNameRegister.length > 0 && /[^a-zA-Z]/.test(lastNameRegister)}
                              valid={lastNameRegister.length !== 0 && !/[^a-zA-Z]/.test(lastNameRegister)}
                              onChange={(e) => setLastNameRegister(e.target.value)}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Input
                              type="password" 
                              name="passwordRegister"
                              placeholder="Password"
                              invalid={passwordRegister.length > 0 && !validatePassword(passwordRegister)} 
                              valid={validatePassword(passwordRegister)}
                              onChange={(e) => setPasswordRegister(e.target.value)}/>
                            <FormFeedback>
                                {validatePasswordLiteral(passwordRegister)}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Input
                              type="password" 
                              name="passwordConfirm" 
                              placeholder="Confirm Password" 
                              invalid={passwordConfirmRegister.length > 0 && (!validatePassword(passwordConfirmRegister) || (passwordRegister)!==(passwordConfirmRegister))} 
                              valid={(passwordRegister)===(passwordConfirmRegister) && validatePassword(passwordConfirmRegister)}
                              onChange={(e) => {setPasswordConfirmRegister(e.target.value);}}
                            />
                            <FormFeedback>
                                Passwords do not match
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => {setRoleRegister(e.target.value)}}>
                              <option value="student">I'm a student</option>
                              <option value="tutor">I'm a tutor</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Input type="text" name="phone" placeholder="Phone (Optional)" onChange={(e) => {setPhoneRegister(e.target.value)}}
                            valid={validatePhone(phoneRegister)}
                            invalid={phoneRegister.length > 0 && !validatePhone(phoneRegister)}
                            >
                            </Input>
                            <FormText>Ex. 8475664332 (Only Numbers)</FormText>          
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button 
                        size="lg" 
                        color="secondary" 
                        hidden={loadingRegister}
                        disabled={
                          !((passwordRegister)===(passwordConfirmRegister) && validatePassword(passwordConfirmRegister))
                          ||!(validateEmail(emailRegister))
                          ||!(emailRegister.length > 0)
                          ||!(lastNameRegister.length !== 0 && !/[^a-zA-Z]/.test(lastNameRegister))
                          ||!(firstNameRegister.length !== 0 && !/[^a-zA-Z]/.test(firstNameRegister))
                          ||!(validatePhone(phoneRegister)|| phoneRegister.length ===0)} 
                        onClick={async () => {
                          setAlertRegister(false);
                          setLoadingRegister(true);
                          await handleRegister(emailRegister,passwordRegister,passwordConfirmRegister,
                          phoneRegister,firstNameRegister,lastNameRegister,roleRegister,
                          history,setAlertRegister,setAlertMessageRegister);
                          setLoadingRegister(false);
                          }}>
                          Register
                      </Button> 
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ReactLoading hidden={!loadingRegister} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                      </div> 
                  </Form>
              </Card.Body>
            </Col>
          </Card>
          Already have an account? <Link to="/login">Sign In Now</Link><br></br>
      </Container>
  </div>
};


async function handleRegister(emailRegister,passwordRegister,passwordConfirmRegister,phoneRegister,
  firstNameRegister,lastNameRegister,roleRegister,history,setAlertRegister,setAlertMessageRegister){
  try{
    setAlertRegister(false);
    if (!emailRegister||!passwordRegister||!passwordConfirmRegister||!firstNameRegister||!lastNameRegister||!roleRegister){
      setAlertRegister(true);
      setAlertMessageRegister("Please fill in all required fields");
    }
    if (!getUser()){
      const body = {
        "email":emailRegister,
        "password":passwordRegister,
        "role":roleRegister,
        "first":firstNameRegister,
        "last":lastNameRegister,
        "phone":phoneRegister
      };
      const data = await apiRegister(body);
      login(data.data.user,data.data.user.role,data.data.user.isVerified);
      if(!getIsVerified()){
        history.push('/verify');
      } else {
        history.push(`/dashboard/${data.data.user.role}`);
      }
    } else {
      setAlertRegister(true);
      setAlertMessageRegister("Please Logout First");
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



export default Register;