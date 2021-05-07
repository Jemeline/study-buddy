//Written by Clayton Saunders

//This component renders on the Student dashboard and allows the user to send the Study Buddy
//Website link to a friend with a valid email address.

import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getUser } from "../../utils/common";
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import {apiGetStudents,apiGetStudentProfile,apiGetStudentProfiles, apiGetCourseById} from '../../utils/api';

// Function to render component
function InviteLink() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    //Initializes the email.js account to the correct user
    init('user_CiCtPrm14cI8KybGSOClZ')

    //gets current user
    const { first, last } = JSON.parse(getUser());
    
    // Once the form has been completed, this function is called to send the email
    function submitForm () {
        
        checkemail(email).then((res) => {
            //If friend email is already registered, will alert the user. If not, will send the email
            if (res) {
                alert("This friend is already a Study Buddy!");
            } else {
                try {
            
                    let templateParams = {
                        to_email: email,
                        to_name: name,
                        from_name: first+" "+last
                    }
                    if (name != '') {
                        emailjs.send("service_uy27b0i", "template_dq21kth", templateParams).then(() => {
                            alert("Successfully sent your invite!");
                        })
                    }
                } catch(err) {
                    console.error(err);
                }
            }
        });
    };

    //Prevents from sending email before submissions
    function handleSubmit(event) {
        event.preventDefault()
        submitForm()
    }

    //Makes sure that the inviter is not inviting an already registered user
    async function checkemail(email) {
        const students = (await apiGetStudents()).data;
        console.log(students)
        for (let i = 0; i < students.length; i++) {
            if (students[i].email == email) {
                return true
            }
        }

        return false
    }

    // Renders the actual invite component
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h4>Invite a Friend</h4>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>Friend Name</Form.Label>
                        <Form.Control
                            style={{"width": "40vw"}}
                            rows={1}
                            as="textarea"
                            placeholder="john doe"
                            onChange={e => {setName(e.target.value)}}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                    <Form.Label>Friend Email</Form.Label>
                        <Form.Control
                            style={{"width": "40vw"}}
                            rows={1}
                            as="textarea"
                            placeholder="john@doe.com"
                            onChange={e => {setEmail(e.target.value)}}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row> 
                    <Button variant="primary" type="submit">Submit</Button>
                </Form.Row>
            </Form>
        </Container>
    );
}

export default InviteLink;