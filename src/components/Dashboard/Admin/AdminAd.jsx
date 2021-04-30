import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { colorPalette } from "../../../utils/design";
import { Button } from "react-bootstrap";
import {Input} from 'reactstrap';
import { editAd, deleteAd } from "../../../utils/api";
import {capitalizeFirst} from '../../../utils/common';
import CourseSearchImproved from '../../CourseSchedule/CourseSearchImproved.component';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';

const AdminAd = ({ ad }) => {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(ad.text);
    const [modal, setModal] = useState(false);
    const [courseSchedule, setCourseSchedule] = useState([]);

    const handleSubmitEdit = async e => {
        try {
            e.preventDefault();
            await editAd({
                "_id": ad._id, 
                "tutorEmail": ad.tutorEmail,
                "text": text,
                "courses": courseSchedule.map(e=>e.courseSubject+' '+ e.courseNumber +'-' + String(e.courseSection).padStart(3, '0')),
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

    return editMode ? 
    <div style={{height:"100%", margin: "2vh", backgroundColor:colorPalette.white,textAlign:"left",paddingLeft:"3%",paddingRight:"3%", display:'flex',justifyContent:'space-between',flexDirection:'column',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',}}>
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
            value={courseSchedule.map(e=>e.courseSubject+' '+ e.courseNumber +'-' + String(e.courseSection).padStart(3, '0'))}
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
            <Button style={{backgroundColor:colorPalette.secondary}} onClick={handleDelete}>Delete Ad</Button>
            <Button variant="danger" onClick={e => {
                setText(ad.text);
                setCourseSchedule([]);
                setEditMode(false);
            }}>Cancel</Button>
        </div>
    </div> 
    : <div style={{margin: "2vh", height:"100%",backgroundColor:colorPalette.white,textAlign:"left",paddingLeft:"2%",paddingRight:"2%", display:'flex',justifyContent:'space-between',flexDirection:'column',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',}}>
        <div style={{marginBottom: "2vh"}}>
            <p><strong>Name:</strong> {capitalizeFirst(ad.first)} {capitalizeFirst(ad.last)}</p>
            <p><strong>Email: </strong>{ad.tutorEmail}</p>
            <p>{ad.text}</p>
            <p style={{marginBottom:0,marginTop:0}}><strong>Courses:</strong></p>{ad.courses.map(e=> <p key={e} style={{marginBottom:0,marginTop:0}}>{e}, </p>)}
            {ad.ratings.length === 0 ? <p><strong>Average Rating:</strong> Unrated </p>: <p><strong>Average Rating:</strong> {Math.round((ad.ratings.reduce((acc, cur) => acc + cur) * 100 / ad.ratings.length)) / 100}</p>}
            <Container><Button style={{backgroundColor:colorPalette.secondary}} onClick={e => setEditMode(true)}>Edit</Button></Container>
        </div>
    </div>;
};

export default AdminAd;