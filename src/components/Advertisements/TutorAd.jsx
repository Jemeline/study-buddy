import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Slider } from "@material-ui/core";
import "./TutorAd.css";
import { colorPalette } from "../../utils/design";
import { Button } from "react-bootstrap";
import {Input} from 'reactstrap';
import { editAd, deleteAd } from "../../utils/api";
import {capitalizeFirst} from '../../utils/common';
import CourseSearchImproved from '../CourseSchedule/CourseSearchImproved.component';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';

const TutorAd = ({ isTutor, ad }) => {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(ad.text);
    const [rating, setRating] = useState(5);
    const [modal, setModal] = useState(false);
    const [courseSchedule, setCourseSchedule] = useState([]);

    const handleSubmitEdit = async e => {
        try {
            e.preventDefault();
            await editAd({
                "_id": ad._id, 
                "tutorEmail": ad.tutorEmail,
                "text": text,
                "courses": courseSchedule.map(e=>e.courseSubject+' '+ e.courseNumber),
                "first": ad.first,
                "last": ad.last,
                "ratings": ad.ratings
            });
            window.location.reload();
        } catch(err) {
            console.error(err);
        }
    }
    const handleDelete = async e => {
        try {
            e.preventDefault();
            const res = await deleteAd(ad._id);
            if(res.status === 200) {
                window.location.reload();
            } else {
                console.log(res);
            }
        } catch(err) {
            console.error(err);
        }
    }
    const submitRating = async e => {
        try {
            e.preventDefault();
            await editAd({
                "_id": ad._id, 
                "tutorEmail": ad.tutorEmail,
                "text": ad.text,
                "courses": ad.courses,
                "first": ad.first,
                "last": ad.last,
                "ratings": ad.ratings.concat([rating])
            });
            window.location.reload();
        } catch(err) {
            console.error(err);
        }
    };

    return editMode ? 
    <div style={{height:"100%",backgroundColor:colorPalette.white,textAlign:"left",paddingLeft:"3%",paddingRight:"3%", display:'flex',justifyContent:'space-between',flexDirection:'column',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',}}>
        <Modal isOpen={modal} toggle={()=> {setModal(false);}}>
        <ModalHeader toggle={()=> {setModal(false);}}>Add Courses</ModalHeader>
            <ModalBody>
                <CourseSearchImproved courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule}/>
            </ModalBody>
        </Modal>
        <div style={{marginTop:'3%'}}> 
            <Form.Control
                as="textarea"
                rows={4}
                value={text}
                onChange={e => setText(e.target.value)}
            />
        </div> 
        <div>
        <Input
            style={{ width: "100%",backgroundColor:'white' }}
            type='text'
            placeholder="Courses You Add Show Up Here"
            value={courseSchedule.map(e=>e.courseSubject+' '+ e.courseNumber )}
            onClick={()=>setModal(true)}
        />
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <Button
            size="small"
            style={{backgroundColor:colorPalette.secondary,color:colorPalette.white}}
            onClick={() => setCourseSchedule([])}
        > Clear Courses</Button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom: "3%"}}>
            <Button style={{backgroundColor:colorPalette.secondary}} onClick={handleSubmitEdit}>Submit</Button>
            <Button style={{backgroundColor:colorPalette.secondary}} data-testid="deleteBtn" onClick={handleDelete}>Delete Ad</Button>
            <Button style={{backgroundColor:colorPalette.secondary}} onClick={e => {
                setText(ad.text);
                setCourseSchedule([]);
                setEditMode(false);
            }}>Cancel</Button>
        </div>
    </div> 
    : <div style={{height:"100%",backgroundColor:colorPalette.white,textAlign:"left",paddingLeft:"2%",paddingRight:"2%", display:'flex',justifyContent:'space-between',flexDirection:'column',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',}}>
        <div>
            <p><strong>Name:</strong> {capitalizeFirst(ad.first)} {capitalizeFirst(ad.last)}</p>
            <p><strong>Email: </strong>{ad.tutorEmail}</p>
            <p>{ad.text}</p>
            <p style={{marginBottom:0,marginTop:0}}><strong>Courses:</strong></p>{ad.courses.map(e=> <p key={e} style={{marginBottom:0,marginTop:0}}>{e}, </p>)}
            {ad.ratings.length === 0 ? <p><strong>Average Rating:</strong> Unrated </p>: <p><strong>Average Rating:</strong> {Math.round((ad.ratings.reduce((acc, cur) => acc + cur) * 100 / ad.ratings.length)) / 100}</p>}
            <br/>
        </div>
        <div>
            {isTutor ? null : <Container>
                <p>Studied with {capitalizeFirst(ad.first)}? Leave a rating!</p>
                <Row><Col>
                    <Slider
                        value={rating}
                        onChange={(e, val) => setRating(val)}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={10}
                    />
                </Col></Row>
                <Row><Col>
                    <Button style={{"marginBottom": "2vh"}} onClick={submitRating}>Submit Rating</Button>
                </Col></Row>
            </Container>}
        </div>
        {isTutor ? <Container>
            <Button variant="primary" style={{backgroundColor:colorPalette.secondary,"marginBottom": "2vh"}} data-testid="editBtn" onClick={e => setEditMode(true)}>Edit</Button>
        </Container> : null}

    </div>;
};

export default TutorAd;
