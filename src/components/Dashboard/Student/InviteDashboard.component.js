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
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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
            setError(false);
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
            setError(true);
            setAlertMessage("Something went wrong. Your invite was not sent.");
        }
    };

    function handleSubmit(event) {
        event.preventDefault()
        submitForm();
    }

    return (
            <Paper data-testid='Invite-Dashboard' style={{overflow:'auto',height:'350px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div>
                    <h5 style={{marginTop:'5px',marginBottom:'5px',fontFamily: 'Garamond, serif'}}><strong>Invite A Friend</strong></h5>
                    <h5 style={{marginTop:'5px',marginBottom:'5px',fontFamily: 'Garamond, serif'}}><strong>To Join Study Buddy</strong></h5>
                    <br/>
                    <p style={{backgroundColor:colorPalette.secondary,color:'white',marginLeft:'2px',marginRight:'2px'}} onClick={()=> setAlertMessage('')}>{alertMessage}</p>      
                    <Form onSubmit={handleSubmit} style={{marginLeft:'10px',marginRight:'10px'}}>
                        <Form.Row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <Form.Group>
                                <Input
                                    placeholder="Name"
                                    onChange={e => {setName(e.target.value)}}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <Form.Group>
                                <Input
                                    placeholder="Email"
                                    onChange={e => {setEmail(e.target.value)}}
                                />
                            </Form.Group>
                        </Form.Row>
                        <br/>
                        <div style={{display:'flex',justifyContent:'center'}}>
                        <Form.Row style={{marginTop:'5px',marginBottom:'5px'}}> 
                            <Button style={{backgroundColor:colorPalette.secondary}} variant="primary" type="submit">Send</Button>
                        </Form.Row>
                        </div>
                    </Form>
            </div>
        </Paper>
    );
}

export default InviteDashboard;