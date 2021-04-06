import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
  FormGroup,FormText,Input,FormFeedback} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiRegister} from '../../utils/api';
import {getUser,login, getIsVerified,logout} from '../../utils/common';
import {validatePassword,validatePhone,validateEmail,validatePasswordLiteral} from '../../utils/regex';
import {colorPalette} from '../../utils/design';
import logo from '../study-buddy-tagline.png';


function Register({setIsLoggedIn,setTab,setFirst,setEmail,setId}){
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
  const [alertAlreadyLoggedIn, setAlertAlreadyLoggedIn] = useState(false);
  const history = useHistory();
  
  const dismissAlerts= () => {
    setAlertMessageRegister('');
    setAlertAlreadyLoggedIn(false);
    setAlertRegister(false);
  };

  return <div>
    <div >
      <Container style={{width:'35vw', margin: "auto"}}> 
        <Col>
        <img src={logo} style={{height: '35vh'}}/>
        <br/>
        <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertRegister} onClose={() => setAlertRegister(false)} dismissible transition={false}>
          {alertMessageRegister}
        </Alert>
        <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertAlreadyLoggedIn} onClose={() => setAlertAlreadyLoggedIn(false)} dismissible transition={false}>
                Please <Link to="/auth" onClick={()=>{setAlertAlreadyLoggedIn(false);logout()}}>Logout</Link> or <Link to="/dashboard/student">Go To Your Dashboard</Link>
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
                  style={{borderRadius:14}}
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
                      onChange={(e) => setFirstNameRegister(e.target.value)}
                      style={{borderRadius:14}}
                    />
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
                      onChange={(e) => setLastNameRegister(e.target.value)}
                      style={{borderRadius:14}}
                    />
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
                    onChange={(e) => setPasswordRegister(e.target.value)}
                    style={{borderRadius:14}}
                  />
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
                    style={{borderRadius:14}}
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
                  <Input type="select" name="select" id="exampleSelect" onChange={(e) => {setRoleRegister(e.target.value)}} style={{borderRadius:14}}>
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
                    style={{borderRadius:14}}
                  >
                  </Input>
                  <FormText>Ex. 8475664332 (Only Numbers)</FormText>          
                </FormGroup>
              </Col>
            </Row>
            <Button 
              size="lg" 
              style={{backgroundColor:colorPalette.secondary,color:colorPalette.white}}
              type="submit"
              hidden={loadingRegister}
              disabled={
                !((passwordRegister)===(passwordConfirmRegister) && validatePassword(passwordConfirmRegister))
                ||!(validateEmail(emailRegister))
                ||!(emailRegister.length > 0)
                ||!(lastNameRegister.length !== 0 && !/[^a-zA-Z]/.test(lastNameRegister))
                ||!(firstNameRegister.length !== 0 && !/[^a-zA-Z]/.test(firstNameRegister))
                ||!(validatePhone(phoneRegister)|| phoneRegister.length ===0)} 
              onClick={async (e) => {
                e.preventDefault();
                dismissAlerts();
                setLoadingRegister(true);
                await handleRegister(emailRegister,passwordRegister,passwordConfirmRegister,
                phoneRegister,firstNameRegister,lastNameRegister,roleRegister,
                history,setAlertRegister,setAlertMessageRegister,setIsLoggedIn,setLoadingRegister,
                setAlertAlreadyLoggedIn,dismissAlerts,setFirst,setEmail,setId,setTab);
                }}>
                Register
            </Button> 
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <ReactLoading hidden={!loadingRegister} type={"cylon"} color={colorPalette.secondary} height={'10%'} width={'10%'} /> 
            </div> 
        </Form>
        <br/>
        Already Have an Account?
        <Link to="/auth" onClick={()=>{setTab('login')}}> Sign In Now</Link>
        <br/>
      </Col> 
    </Container>
    </div> 
  </div>
};


async function handleRegister(emailRegister,passwordRegister,passwordConfirmRegister,phoneRegister,
  firstNameRegister,lastNameRegister,roleRegister,history,setAlertRegister,setAlertMessageRegister,setIsLoggedIn,
  setLoadingRegister,setAlertAlreadyLoggedIn,dismissAlerts,setFirst,setEmail,setId,setTab){
  try{
    dismissAlerts();
    if (!emailRegister||!passwordRegister||!passwordConfirmRegister||!firstNameRegister||!lastNameRegister||!roleRegister){
      dismissAlerts();
      setAlertRegister(true);
      setAlertMessageRegister("Please fill in all required fields");
      setLoadingRegister(false);
    } else {
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
        login(data.data.user,data.data.user.role,data.data.user.isVerified,data.data.user.isSurveyed);
        setIsLoggedIn(true);
        if(!getIsVerified()){
          setFirst(data.data.user.first);
          setEmail(data.data.user.email);
          setId(data.data.user._id);
          setTab('verify');
        } else {
          history.push(`/dashboard/${data.data.user.role}`);
        }
      } else {
        setLoadingRegister(false);
        dismissAlerts();
        setAlertAlreadyLoggedIn(true);
      }
  }
  } catch (error){
    setLoadingRegister(false);
    if (error.response.status === 401){
      dismissAlerts();
      setAlertRegister(true);
      setAlertMessageRegister(error.response.data.msg);
    } else {
      dismissAlerts();
      setAlertRegister(true);
      setAlertMessageRegister("Oops... Something Went Wrong");
    } 
  };
};



export default Register;