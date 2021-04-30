import React, { useState,useEffect } from "react";
import {Form} from "react-bootstrap";
import {Input,Button} from 'reactstrap';
import { getUser } from "../../../utils/common";
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import Paper from '@material-ui/core/Paper';
import { colorPalette } from "../../../utils/design";
import {getUsers} from '../../../utils/api';


function InviteDashboard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
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
                    setAlertMessage("Successfully sent your invite!");
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
        <div style={{width:"100%"}}>
            <Paper style={{overflow:'auto',maxHeight:'30vh',height:'30vh',margin:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div>
                <h5 style={{marginTop:'5px',marginBottom:'0px'}}>Invite A Friend</h5>
                <p style={{backgroundColor:colorPalette.secondary,color:'white',marginLeft:'2px',marginRight:'2px'}} onClick={()=> setAlertMessage('')}>{alertMessage}</p>      
                <Form onSubmit={handleSubmit} style={{marginLeft:'10px',marginRight:'10px'}}>
                    <Form.Row style={{marginTop:'0px',marginBottom:'0px'}}>
                        <Form.Group>
                            <Input
                                placeholder="Name"
                                onChange={e => {setName(e.target.value)}}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{marginTop:'0px',marginBottom:'0px'}}>
                        <Form.Group>
                            <Input
                                placeholder="Email"
                                onChange={e => {setEmail(e.target.value)}}
                            />
                        </Form.Group>
                    </Form.Row>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <Form.Row style={{marginTop:'0px',marginBottom:'0px'}}> 
                        <Button style={{backgroundColor:colorPalette.secondary}} variant="primary" type="submit">Submit</Button>
                    </Form.Row>
                    </div>
                </Form>
                </div>
            </Paper>
        </div>
    );
}

export default InviteDashboard;