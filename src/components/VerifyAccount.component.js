import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
    FormGroup,FormFeedback,Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiVerify,apiToken} from '../utils/api';
import {getUser,getRoleLiteral,validateToken} from '../utils/common';

function VerifyAccount(){
    const user = JSON.parse(getUser());
    const emailVerify = user.email;
    const h5 = `Hello ${user.first.charAt(0).toUpperCase()+user.first.slice(1).toLowerCase()},`;
    const p = `Click below to recieve a validation token at ${user.email}`
    const [alertVerify, setAlertVerify] = useState(false);
    const [alertMessageVerify, setAlertMessageVerify] = useState('');
    const [pTagVerify,setpTagVerify]=useState(p);
    const [h5TagVerify,seth5TagVerify]=useState(h5);
    const [tokenVerify,setTokenVerify]=useState(false);
    const history = useHistory();
    const [token, setToken] = useState('');
    const [verified,setVerified] = useState(false);
    
    return <div> 
        <Container style={{width:"40%", margin: "auto"}} >     
          <Card bg="light" style={{ borderRadius: 8}}>
          <Card.Header><h4>Verify Your Account</h4></Card.Header>
            <Row>
              <Col>
                <Card.Body>
                    <Col>
                        <Alert variant="danger" show={alertVerify} onClose={() => setAlertVerify(false)} dismissible transition={false}>
                        {alertMessageVerify}
                        </Alert>
                        <h5>{h5TagVerify}</h5>
                        <p>{pTagVerify}</p>
                    </Col>  
                  <Container>
                  <Form hidden={!tokenVerify || verified} className="form">
                      <Col>
                      <FormGroup>
                          <Input
                              type="text"
                              name="token"
                              placeholder="Token"
                              value={token}
                              onChange={(e) => {
                                setToken(e.target.value)
                              }}
                              valid={validateToken(token)}
                              invalid={token.length > 0 && !validateToken(token)}    
                            />
                          </FormGroup>
                      </Col> 
                  </Form>
                  </Container>
                  <Button 
                    size="lg"
                    color="secondary"
                    hidden={tokenVerify}
                    disabled={
                        !(emailVerify===user.email)
                        ||!(emailVerify.length > 0)}
                    onClick={async () => {await handleVerify(emailVerify,setAlertVerify,setAlertMessageVerify,setpTagVerify,setTokenVerify,seth5TagVerify);}}
                  > Send Me A Confirmation Email</Button>
                  <Button 
                    size="lg"
                    color="secondary"
                    hidden={!tokenVerify || verified}
                    onClick={async () => {await handleToken(token,history,setAlertVerify,setAlertMessageVerify,
                        user,setpTagVerify,setTokenVerify,setToken,seth5TagVerify,h5,setVerified);}}
                    disabled={!validateToken(token)}
                  > Verify My Account</Button>
                  <Button 
                    size="lg"
                    color="secondary"
                    hidden={!verified}
                    onClick={() => {history.push(`/dashboard/${getRoleLiteral()}`);}}
                  > Go To My Dashboard</Button>
                </Card.Body>
              </Col>
            </Row>
            <Button
                color="link"
                size="sm"
                hidden={tokenVerify}
                onClick={()=>{seth5TagVerify('');setTokenVerify(true);setpTagVerify("");setToken('');}}
            > I already have a token</Button>
            <Button
                color="link"
                size="sm"
                hidden={!tokenVerify || verified}
                onClick={()=>{seth5TagVerify(h5);setTokenVerify(false);setpTagVerify(p);}}
            > I need a token</Button>
            </Card>
            <Link hidden={verified} to="/incorrect-email">Change the email associated with your account</Link>
            
        </Container>
        
    </div>
};

async function handleVerify(emailVerify,setAlertVerify,setAlertMessageVerify,setpTagVerify,setTokenVerify,seth5TagVerify){
    try{
        setAlertVerify(false);
        if (getUser()){
            const body = {"email":emailVerify}
            const data = await apiVerify(body);
            setpTagVerify(data.data.msg);
            seth5TagVerify('');
            setTokenVerify(true);
        } else {
            setAlertVerify(true);
            setAlertMessageVerify("You must login first");
        }  
      } catch (error){
            setAlertVerify(true);
            setAlertMessageVerify("Oops... Something Went Wrong");
      };
};

async function handleToken(token,history,setAlertVerify,setAlertMessageVerify,
    user,setpTagVerify,setTokenVerify,setToken,seth5TagVerify,h5,setVerified){
    try{
        setAlertVerify(false);
        if (!token){
            setAlertVerify(true);
            setAlertMessageVerify("Please fill in all required fields");
        }
        if (getUser()){
            const body = {"token":token,"_userId":user._id}
            const data = await apiToken(body);
            sessionStorage.setItem('isVerified',data.data.user.isVerified);
            setpTagVerify("Woohoo! You've been verified.");
            setVerified(true);
        } else {
            setAlertVerify(true);
            setAlertMessageVerify("You must login first");
        }  
      } catch (error){
        if (error.response.status === 401){
            setpTagVerify("Your token is incorrect or expired. Please request a new confirmation email.");
            setTokenVerify(false);
            setToken('');
            seth5TagVerify(h5)
        } else if (error.response.status === 402) {
            setAlertVerify(true);
            setAlertMessageVerify(error.response.data.msg);
        } else if (error.response.status === 403) {
            history.push(`/dashboard/${getRoleLiteral()}`);
        } else {
            setAlertVerify(true);
            setAlertMessageVerify("Oops... Something Went Wrong");
        }
      };
};

export default VerifyAccount;