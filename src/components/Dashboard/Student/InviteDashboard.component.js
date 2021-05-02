import React, { useState,useEffect } from "react";
import {Form} from "react-bootstrap";
import {Input,Button} from 'reactstrap';
import { getUser } from "../../../utils/common";
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import Paper from '@material-ui/core/Paper';
import { colorPalette } from "../../../utils/design";
import {getUsers} from '../../../utils/api';
import ReactLoading from "react-loading";
function InviteDashboard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    init('user_CiCtPrm14cI8KybGSOClZ');
    const { first, last } = JSON.parse(getUser());

    useEffect(async () => {
        try{
            setLoading(true);
            const data = await getUsers();
            const emailArr = await data.data.map(e=>e.email);
            setEmails(emailArr);
            setLoading(false);
        } catch (err){
            setLoading(false);
            setError(true);
            console.log(err);
        }  
      }, []);
    
    function submitForm () {
        setAlertMessage('')
        try {
            let templateParams = {
                to_email: email,
                to_name: name,
                from_name: first+" "+last
            }
            if (emails.includes(email.toLowerCase())){
                setAlertMessage("User already member");
            } else if (name.length === 0 || email.length === 0){
                setAlertMessage("Fill in all fields");
            } else {
                emailjs.send("service_uy27b0i", "template_dq21kth", templateParams).then(() => {
                    setAlertMessage("Invite Sent!");
                });
            }
        } catch(err) {
            console.error(err);
            setAlertMessage("Something went wrong. Your invite was not sent.");
        }
    };

    function handleSubmit(event) {
        event.preventDefault()
        submitForm();
    }

    return (
        <div>{(loading) ? <div style={{backgroundColor:'white',zIndex:-1,height:'225px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
        (error) ? <div style={{backgroundColor:'white',zIndex:-1,height:'225px',display:'flex',justifyContent:'center',alignItems: 'center',flexDirection:'column',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={'red'}/><p>Oops... Something Went Wrong</p></div>:
                <Paper style={{overflow:'auto',height:'225px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{height:'225px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <h5 style={{marginTop:'1px',fontFamily: 'Garamond, serif'}}><strong>Invite A Friend To Join Study Buddy</strong></h5>
                        <h5 style={{marginTop:'1px',fontFamily: 'Garamond, serif'}}><strong></strong></h5>
                        <strong><p hidden={alertMessage==''} style={{color:colorPalette.secondary,marginTop:'0px',marginBottom:'2px',cursor:'pointer'}} onClick={()=> setAlertMessage('')}>{alertMessage}</p></strong>      
                        <Form onSubmit={handleSubmit} style={{marginLeft:'10px',marginRight:'10px',marginTop:'2px'}}>
                            <Form.Row style={{marginTop:'2px',marginBottom:'0px',margin:0}}>
                                <Form.Group>
                                    <Input
                                        placeholder="Name"
                                        onChange={e => {setName(e.target.value)}}
                                        style={{height:'30px'}}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row style={{marginTop:'2px',marginBottom:'0px',margin:0}}>
                                <Form.Group>
                                    <Input
                                        placeholder="Email"
                                        onChange={e => {setEmail(e.target.value)}}
                                        style={{height:'30px'}}
                                    />
                                </Form.Group>
                            </Form.Row>
                                <div style={{display:'flex',justifyContent:'center',margin:0}}>
                                    <Form.Row style={{height:'30px',marginTop:'2px',marginBottom:'0px'}}> 
                                        <Button style={{backgroundColor:colorPalette.secondary}} variant="primary" type="submit">Send</Button>
                                    </Form.Row>
                                </div>
                        </Form>
                </div>
            </Paper>}
        </div>
    );
}

export default InviteDashboard;