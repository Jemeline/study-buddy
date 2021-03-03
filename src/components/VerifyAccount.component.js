import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
    FormGroup, Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiLogin} from '../utils/api';
import {getUser,login} from '../utils/common';

function VerifyAccount(){
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [alertVerify, setAlertVerify] = useState(false);
    const [alertMessageVerify, setaAlertMessageVerify] = useState('');
    const history = useHistory();
    const user = JSON.parse(getUser());

  
    // style={{position:"absolute", top:0, right:0, bottom:0, left:0,backgroundImage: "url(" + loginImg + ")",}}
    return <div> 
        <Container style={{width:"40%", position:"absolute",top: "35%", bottom: 0, left: 0, right: 0,margin: "auto"}} >     
          <Card bg="dark" style={{ borderRadius: 8 , opacity:.8, color:"white"}}>
            <Row>
              <Col>
                <Card.Body>
                    <Alert variant="danger" show={alertVerify} onClose={() => setAlertVerify(false)} dismissible transition={false}>
                      {alertMessageVerify}
                    </Alert>
                  <h4>Hello {user.first.charAt(0).toUpperCase()+user.first.slice(1).toLowerCase()},</h4>
                  <p>Please click below to verify your email address.</p>
                  <br></br>
                  <Button size="lg" color="secondary" onClick={async () => {await handleVerify();}}>Verify My Email Address</Button>
                </Card.Body>
              </Col>
            </Row>
            </Card>
        </Container>
    </div>
};

function handleVerify(){
    
};

export default VerifyAccount;