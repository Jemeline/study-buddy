import React, {useState} from 'react';
import {Button,Col,Container,Row,Form,
    FormGroup,FormFeedback,Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiVerify,apiToken} from '../utils/api';
import {getUser,getRoleLiteral,validateToken} from '../utils/common';
import ReactLoading from 'react-loading';

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
    const [loadingVerify,setLoadingVerify]=useState(false);
    const history = useHistory();
    const [token, setToken] = useState('');
    const [verified,setVerified] = useState(false);
    const [alertInvalidToken, setAlertInvalidToken] = useState(false);
    
    return <div> 
        <Container style={{width:"35%", margin: "auto"}} >     
          <Card bg="light" style={{ borderRadius: 8}}>
            <Card.Header><h4>Verify Your Account</h4></Card.Header>
              <Col>
                <Card.Body>
                    <Alert variant="danger" show={alertVerify} onClose={() => setAlertVerify(false)} dismissible transition={false}>
                    {alertMessageVerify}
                    </Alert>
                    <Alert variant="danger" show={alertInvalidToken} onClose={() => setAlertInvalidToken(false)} dismissible transition={false}>
                        Your token is incorrect or expired. Please <Link to="/verify">request a new token</Link> or try again.
                    </Alert>
                    <h5>{h5TagVerify}</h5>
                    <p>{pTagVerify}</p> 
                  <Form hidden={!tokenVerify || verified} className="form">
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
                  </Form>
                  <Button 
                    size="lg"
                    color="secondary"
                    hidden={tokenVerify || loadingVerify}
                    disabled={
                        !(emailVerify===user.email)
                        ||!(emailVerify.length > 0)}
                    onClick={async () => {
                        setLoadingVerify(true);
                        setAlertVerify(false);
                        setAlertInvalidToken(false);
                        await handleVerify(emailVerify,setAlertVerify,setAlertMessageVerify,setpTagVerify,setTokenVerify,seth5TagVerify);
                        setLoadingVerify(false);
                    }}
                  > Send Me A Confirmation Email</Button>
                  <Button 
                    size="lg"
                    color="secondary"
                    hidden={!tokenVerify || verified || loadingVerify}
                    onClick={async () => {
                        setLoadingVerify(true);
                        setAlertVerify(false);
                        setAlertInvalidToken(false);
                        await handleToken(token,history,setAlertVerify,setAlertMessageVerify,
                        user,setpTagVerify,setVerified,setAlertInvalidToken);
                        setLoadingVerify(false);
                    }}
                    disabled={!validateToken(token)}
                  > Verify My Account</Button>
                  <Button 
                    size="lg"
                    color="secondary"
                    hidden={!verified || loadingVerify}
                    onClick={() => {
                        setLoadingVerify(true);
                        history.push(`/dashboard/${getRoleLiteral()}`);
                        setLoadingVerify(false);
                    }}
                  > Go To My Dashboard</Button>
                </Card.Body>
            </Col>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading hidden={!loadingVerify} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                </div>
            <Button
                color="link"
                size="sm"
                hidden={tokenVerify}
                onClick={()=>{
                    setAlertVerify(false);
                    setAlertInvalidToken(false);
                    seth5TagVerify('');
                    setTokenVerify(true);
                    setpTagVerify("");
                    setToken('');}}
            > I already have a token</Button>
            <Button
                color="link"
                size="sm"
                hidden={!tokenVerify || verified}
                onClick={()=>{
                    setAlertVerify(false);
                    setAlertInvalidToken(false);
                    seth5TagVerify(h5);
                    setTokenVerify(false);
                    setpTagVerify(p);
                    setToken('');}}
            > I need a token</Button>
            </Card>
            <Link hidden={verified} to="/incorrect-email">Change the email associated with my account</Link>     
        </Container>   
    </div>
};

async function handleVerify(emailVerify,setAlertVerify,setAlertMessageVerify,setpTagVerify,
    setTokenVerify,seth5TagVerify){
    try{
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
    user,setpTagVerify,setVerified,setAlertInvalidToken){
    try{
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
            setAlertInvalidToken(true);
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