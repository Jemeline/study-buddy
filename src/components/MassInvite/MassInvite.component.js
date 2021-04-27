import { React, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useForm } from 'react-hook-form';
import { colorPalette } from '../../utils/design';
import { apiGetCourseById, apiGetStudentProfile, apiGetStudentProfiles, apiGetStudents, sendMassStudyInvite } from '../../utils/api';
import { getUser } from '../../utils/common';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
// import { size } from 'lodash';
// const nodemailer = require("nodemailer");
// const functions = require("firebase-functions");
// const {check, validationResult} = require("express-validator");



function MassStudyInvite() {

    const [user, setUser] = useState(JSON.parse(getUser()));
    // const [chosenClass, setChosenClass] = useState("");
    const [myClasses, setMyClasses] = useState([]);
    // const [errorMessage, setErrorMessage] = useState("");
    // const [successMessage, setSuccessMessage] = useState("");
    // const [message, setMessage] = useState("");
    // const [classId, setClassId] = useState("");
    const {register, handleSubmit, formState: { errors }} = useForm();


    useEffect(async () => {
        try {
            const profileRes = await apiGetStudentProfile(user._id);
            const profile = profileRes.data;
            const classes = [];
            for (let i = 0; i < profile.courseSchedule.length; i++) {
                const courseRes = await apiGetCourseById(profile.courseSchedule[i]);
                const course = courseRes.data;
                const courseClean = course.courseSubject + " " + course.courseNumber;
                classes[i] = [profile.courseSchedule[i], courseClean];
            }
            setMyClasses(classes);
        } catch (err) {
            console.log(err);
        }
    }, []);


    async function onSubmit(data) {
        const studentProfiles = (await apiGetStudentProfiles()).data;
        const message = data.message;
        let classmateIds = [];
        let classmates = [];
        for (let i = 0; i < studentProfiles.length; i++) {
            if (studentProfiles[i].courseSchedule.includes(data.chosenClass) && studentProfiles[i]._userId != user._id) {
                classmateIds.push(studentProfiles[i]._userId);
            }
        }
        const students = (await apiGetStudents()).data;
        for (let i = 0; i < students.length; i++) {
            if (classmateIds.includes(students[i]._id)) {
                classmates.push(students[i].email);
            }
        }
        console.log(classmates);

        try {
            const res = await sendMassStudyInvite(classmates, message);
            console.log(res);
        } catch (err) {
            console.log(err);
        }

        
    }


    return (
        <div style={{backgroundColor: colorPalette.gray, display: "flex", justifyContent: "space-around", zIndex: "-1", height: "100vh"}}>
            <div style={{width: "40vw", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center", margin: "5vh 5vw", overflow: "scroll"}}>
                <Paper elevation={8} style={{margin: "5%", backgroundColor: colorPalette.primary, height: "80%", justifyContent: "center"}}>
                    <p style={{paddingBottom: "2%", borderBottom: "1px solid black", height: "20%"}}>What better way to start a study group than by inviting your whole class! </p>

                    <p style={{height: "40%", padding: "2%"}}>Select the class on the right that you want to study with, write a message, and an email will be sent to all Study Buddy users in that class. <br></br> <em>You should probably include the date, time, and location</em></p>
                    <p style={{padding: "5%", borderTop: "1px solid black", boxSizing: "border-box", width: "40%", margin: "auto", height: "10%"}}>Happy Studying!</p>
                </Paper>
            </div>
            <div style={{width: "40vw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", margin: "5vh 5vw", overflow: "scroll"}}>
                <Paper elevation={5} style={{backgroundColor: colorPalette.primary, width: "90%", height: "90%"}}>
                    {/* <h3>Let people know you want to study!</h3> */}
                    <form onSubmit={handleSubmit(onSubmit)} style={{height: "80%", margin: "10% auto"}}>
                        <select {...register("chosenClass", {required: true})} name="chosenClass" style={{width: "50%", padding: "5px", border: "1px solid black", marginBottom: "5%"}} >
                            <option value="" defaultValue key="placeholder">Choose a class...</option>
                            {myClasses.map(c => <option key={c[0]} value={c[0]}>{c[1]}</option>)}
                        </select>
                        {errors.chosenClass && <p><strong>Please choose a class</strong></p>}
                        <textarea {...register("message", {required: true})} name="message" placeholder={"What do you want to say..."} style={{width: "80%", height: "50%", resize: "none", margin: "10% auto", border: "1px solid black"}} ></textarea>
                        {errors.message && <p><strong>Please write a message</strong></p>}
                        <button type="submit" style={{width: "25%", marginTop: "10%"}}><SendRoundedIcon /></button>
                    </form>
                    {/* <p>{successMessage}</p>
                    <p>{errorMessage}</p> */}
                </Paper>
            </div>
        </div>
    )
}

export default MassStudyInvite;