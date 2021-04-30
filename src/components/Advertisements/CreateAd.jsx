import React, { useState } from "react";
import { colorPalette } from "../../utils/design";
import { Form, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import { getUser } from "../../utils/common";
import { createAd } from "../../utils/api";
import CourseSearchImproved from '../CourseSchedule/CourseSearchImproved.component';
import {Input} from 'reactstrap';

const CreateAd = () => {
    const [text, setText] = useState("");
    const [courses, setCourses] = useState("");
    const [loading, setLoading] = useState(false);
    const [courseSchedule, setCourseSchedule] = useState([]);

    const submitForm = async e => {
        e.preventDefault();
        if (!text || !courseSchedule) {
            alert("Please fill in all fields");
        } else {
            const { email, first, last } = JSON.parse(getUser());
            try {
                setLoading(true);
                const res = await createAd({
                    tutorEmail: email,
                    text: text,
                    courses: courseSchedule.map(e=>e.courseSubject+' '+ e.courseNumber),
                    first: first,
                    last: last,
                    ratings: []
                });
                console.log(res);
                setLoading(false);
                alert("Successfully posted advertisement.");
                window.location.reload();
                return res;
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div style={{display:'flex',alignItems: 'center',justifyContent:"space-between",justifyContent:'center',width:'100vw'}}>
            <div style={{width:'40vw',margin:'5vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',padding:'1vw',height:'70vh',display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
            <Form>
                <Form.Row>
                    <Form.Group>
                        <h4>Create Advertisement</h4>
                        <br/>
                        <Form.Control
                            style={{ width: "30vw",display:'flex',justifyContent:'center' }}
                            rows={3}
                            as="textarea"
                            placeholder="Enter the text of your advertisement."
                            onChange={e => setText(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>Courses</Form.Label>
                        <Input
                            style={{ width: "30vw",backgroundColor:'white' }}
                            rows={2}
                            type='text'
                            disabled
                            placeholder="Courses You Add Show Up Here"
                            value={courseSchedule.map(e=>e.courseSubject+' '+ e.courseNumber)}
                        />
                    </Form.Group>
                </Form.Row>
                <Button
                    size="small"
                    style={{backgroundColor:colorPalette.secondary,color:colorPalette.white}}
                    onClick={() => {setCourseSchedule([])}}
                > Clear Courses</Button>
            </Form>
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                {loading ? (
                    <ReactLoading type={"cylon"} color={colorPalette.secondary} />
                ) : (
                    <Button style={{width:'10vw',backgroundColor:colorPalette.secondary}}variant="primary" onClick={submitForm}>
                        Submit
                    </Button>
                )}
            </div>
            </div>
        <div style={{width:'40vw',margin:'5vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',padding:'1vw',height:'70vh'}}>
            <CourseSearchImproved courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule}/>
        </div>
     </div>
        
    );
};

export default CreateAd;
