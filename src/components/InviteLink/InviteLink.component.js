import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getUser } from "../../utils/common";
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import {apiGetStudents,apiGetStudentProfile,apiGetStudentProfiles, apiGetCourseById} from '../../utils/api';


function InviteLink() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    //const [submit, setSubmit] = useState(false);

    init('user_CiCtPrm14cI8KybGSOClZ')

    const { first, last } = JSON.parse(getUser());
    
    function submitForm () {
        
        checkemail(email).then((res) => {
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

    function handleSubmit(event) {
        event.preventDefault()
        submitForm()
    }

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