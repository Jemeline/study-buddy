import React, {useState} from 'react';
import {Button,Col,Container,Form,FormGroup,Input} from 'reactstrap';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {apiVerify,apiToken} from '../../utils/api';
import {getUser,getRoleLiteral} from '../../utils/common';
import {validateToken} from '../../utils/regex';
import ReactLoading from 'react-loading';
import {colorPalette} from '../../utils/design';
import logo from '../study-buddy-tagline.png';

function VerifyAccount({setIsLoggedIn,setTab,first,email,id}){
    const h5 = `Hello ${first.charAt(0).toUpperCase()+first.slice(1).toLowerCase()},`;
    const p1='Click below to recieve a validation code at:';
    const p2 = `${email}`
    const [alertVerify, setAlertVerify] = useState(false);
    const [alertMessageVerify, setAlertMessageVerify] = useState('');
    const [p1TagVerify,setp1TagVerify]=useState(p1);
    const [p2TagVerify,setp2TagVerify]=useState(p2);
    const [h5TagVerify,seth5TagVerify]=useState(h5);
    const [tokenVerify,setTokenVerify]=useState(false);
    const [loadingVerify,setLoadingVerify]=useState(false);
    const history = useHistory();
    const [token, setToken] = useState('');
    const [verified,setVerified] = useState(false);
    const [alertInvalidToken, setAlertInvalidToken] = useState(false);
    
    const getNewToken = () => {
        setAlertVerify(false);
        setAlertInvalidToken(false);
        seth5TagVerify(h5);
        setTokenVerify(false);
        setp1TagVerify(p1);
        setp2TagVerify(p2);
        setToken('');
    };
    const alreadyHaveToken = () => {
        setAlertVerify(false);
        setAlertInvalidToken(false);
        seth5TagVerify('');
        setTokenVerify(true);
        setp1TagVerify('');
        setp2TagVerify('');
        setToken('');
    };

    return <div>
        <Container style={{width:'35vw',margin: "auto"}} >
              <Col>
                <img src={logo} style={{height: '35vh'}}/>
                <br/>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertVerify} onClose={() => setAlertVerify(false)} dismissible transition={false}>
                {alertMessageVerify}
                </Alert>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alertInvalidToken} onClose={() => setAlertInvalidToken(false)} dismissible transition={false}>
                    Your token is incorrect or expired. Please <Link to="/auth" onClick={()=>{getNewToken();}}>request a new token</Link> or try again.
                </Alert>
                <h5>{h5TagVerify}</h5>
                <p style={{margin:0}}>{p1TagVerify}</p>
                <p style={{margin:0}}><strong><em>{p2TagVerify}</em></strong></p>
                <br/>
                <Form hidden={!tokenVerify || verified} className="form" style={{width:'20vw',margin: "auto"}}>
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
                            style={{borderRadius:14}}    
                        />
                    </FormGroup> 
                </Form>
                <Button 
                size="md"
                style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,fontSize:'1vw'}} 
                hidden={tokenVerify || loadingVerify}
                disabled={!(email.length > 0)}
                onClick={async () => {
                    setLoadingVerify(true);
                    setAlertVerify(false);
                    setAlertInvalidToken(false);
                    await handleVerify(email,setAlertVerify,setAlertMessageVerify,setp1TagVerify,setTokenVerify,seth5TagVerify,setp2TagVerify);
                    setLoadingVerify(false);
                }}
                > Send Me a Code
                </Button>
                <Button 
                    size="md"
                    style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,fontSize:'1vw'}} 
                    hidden={!tokenVerify || verified || loadingVerify}
                    onClick={async () => {
                        setLoadingVerify(true);
                        setAlertVerify(false);
                        setAlertInvalidToken(false);
                        await handleToken(token,history,setAlertVerify,setAlertMessageVerify,
                        id,setp1TagVerify,setVerified,setAlertInvalidToken,setp2TagVerify);
                        setLoadingVerify(false);
                    }}
                    disabled={!validateToken(token)}
                  > Confirm My Email
                  </Button>
                  <Button 
                    size="md"
                    style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,fontSize:'1.5vw'}} 
                    hidden={!verified || loadingVerify}
                    onClick={() => {
                        setLoadingVerify(true);
                        history.push(`/dashboard/${getRoleLiteral()}`);
                        setLoadingVerify(false);
                        setIsLoggedIn(true);
                    }}
                  > Go To My Dashboard
                  </Button>
            </Col>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading hidden={!loadingVerify} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                </div>
            <Button
                color="link"
                size="sm"
                hidden={tokenVerify}
                onClick={()=>{alreadyHaveToken();}}
            > I already have a token</Button>
            <Button
                color="link"
                size="sm"
                hidden={!tokenVerify || verified}
                onClick={()=>{getNewToken();}}
            > I need a token</Button>
        </Container>
        </div>
};

async function handleVerify(emailVerify,setAlertVerify,setAlertMessageVerify,setp1TagVerify,
    setTokenVerify,seth5TagVerify,setp2TagVerify){
    try{
        if (getUser()){
            const body = {"email":emailVerify}
            const data = await apiVerify(body);
            setp1TagVerify(data.data.msg);
            setp2TagVerify('');
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
    id,setp1TagVerify,setVerified,setAlertInvalidToken,setp2TagVerify){
    try{
        if (!token){
            setAlertVerify(true);
            setAlertMessageVerify("Please fill in all required fields");
        }
        if (getUser()){
            const body = {"token":token,"_userId":id}
            const data = await apiToken(body);
            sessionStorage.setItem('isVerified',data.data.user.isVerified);
            setp1TagVerify("Woohoo! Your email has been verified.");
            setp2TagVerify('');
            setVerified(true);
        } else {
            setAlertVerify(true);
            setAlertMessageVerify("You must login first");
        }  
      } catch (error){
          console.log(error);
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