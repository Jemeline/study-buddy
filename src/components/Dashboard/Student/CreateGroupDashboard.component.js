import React, { useState,useEffect } from "react";
import {Paper} from '@material-ui/core';
import { colorPalette } from '../../../utils/design';
import { apiGetCourseById, apiGetStudentProfile, apiGetStudentProfiles, apiGetStudents, sendMassStudyInvite } from '../../../utils/api';
import { getUser } from '../../../utils/common';
import {SendRoundedIcon} from '@material-ui/icons/SendRounded';
import {GroupIcon} from '@material-ui/icons/Group';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReactLoading from "react-loading";
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function CreateGroupDashboard() {
    const [user, setUser] = useState(JSON.parse(getUser()));
    const [myClasses, setMyClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [chosenClassId, setChosenClassId] = useState("");
    const [chosenClassClean, setChosenClassClean] = useState("");
    const [datetime, setDatetime] = useState(new Date());
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(async () => {
        try {
            setLoading(true);
            setError(false);
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
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
            console.log(err);
        }
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        const studentProfiles = (await apiGetStudentProfiles()).data;
        const students = (await apiGetStudents()).data;
        let classmates = [];
        let classmateIds = [];
        for (let i = 0; i < studentProfiles.length; i++) {
            if (studentProfiles[i].courseSchedule.includes(chosenClassId) && studentProfiles[i]._userId != user._id && !students.find(student => studentProfiles[i]._userId === student._id).disabled) {
                classmateIds.push(studentProfiles[i]._userId);
            }
        }
        for (let i = 0; i < students.length; i++) {
            if (classmateIds.includes(students[i]._id)) {
                classmates.push(students[i].email);
            }
        }  

        let time = datetime.toString().slice(16,21);
        let hour = parseInt(time[0] + time[1]);
        let minute = parseInt(time[3] + time[4]);
        if (time[3] === "0") {
            minute = "0" + minute;
        }
        if (hour > 12) {
            hour -= 12;
            time = `${hour}:${minute} PM`
        } else if (hour === 12) {
            time = `${hour}:${minute} PM`
        } else {
            if (hour === 0) {
                hour = 12;
            }
            time = `${hour}:${minute} AM`
        }
           
        
        const formattedMessage = `${user.first.charAt(0).toUpperCase()}${user.first.slice(1).toLowerCase()} ${user.last.charAt(0).toUpperCase()}${user.last.slice(1).toLowerCase()} invited you to study for ${chosenClassClean}! \n \n Date: ${datetime.toString().slice(0, 15)} \n Time: ${time} \n Location: ${location} \n \n ${message}`

        let info = {classmates, formattedMessage};

        try {
            const res = await sendMassStudyInvite(info);
            console.log(res);
            setSuccessMessage("Your email was sent!");
            setErrorMessage("");
        } catch (err) {
            console.log(err);
            setError(true);
            setSuccessMessage("");
            setErrorMessage("There was a problem sending your email. Try again");
        }
    }

    function handleClassChange(e) {
        setChosenClassId(e.target.value.slice(0, e.target.value.length - 9));
        setChosenClassClean(e.target.value.slice(e.target.value.length - 8, e.target.value.length));
    }

    function handleDateTimeChange(datetime) {
        setDatetime(datetime);
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleLocationChange(e) {
        setLocation(e.target.value);
    }


    return (
        <div data-testid='Group-Dashboard'>
            <Paper style={{overflow:'auto',height:'225px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div style={{alignSelf: "flex-start"}}>
                    <h5 style={{marginTop: '20px', marginRight: "50px",fontFamily: 'Garamond, serif',fontSize:'25px'}}><strong>Send A Study Invite</strong></h5>
                    <GroupIcon style={{fontSize: "100px", marginTop: "20px"}}/>
                </div>

                <div>
                    <form onSubmit={handleSubmit} style={{ margin: "5%"}}>
                        <div style={{display: "flex", flexDirection: "column", alignContent: "flex-start"}}>
                            <label style={{alignSelf: "flex-start", marginBottom: "0"}} for="class">Class:</label>
                            <select id="class" required onChange={handleClassChange} name="chosenClass" style={{padding: "5px"}}>
                                <option value="" defaultValue key="placeholder">Choose a class...</option>
                                {myClasses.map(c => <option key={c[0]} value={[c[0], c[1]]}>{c[1]}</option>)}
                            </select>
                            <hr style={{margin: "4px auto"}}></hr>
                            <label style={{alignSelf: "flex-start", marginBottom: "0"}} for="when">When:</label>
                            <DateTimePicker id="when" required minDetail="year" value={datetime} disableClock={true} onChange={handleDateTimeChange} />
                            <hr style={{margin: "4px auto"}}></hr>
                            <label style={{alignSelf: "flex-start", marginBottom: "0"}} for="location">Where:</label>
                            <input onChange={handleLocationChange} required type="text" id="location" name="location" placeholder="Enter a location..." />
                            <hr style={{margin: "4px auto"}}></hr>
                        </div>
                        <button type="submit" style={{width: "25%", backgroundColor: colorPalette.secondary,color:'white',marginTop:'20px', marginBottom:'20px'}}><SendRoundedIcon /></button>
                    </form>
                </div>
                <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="create-group" place="top" effect="float">
                    <p style={{margin:0,width:'250px'}}>Want to study realtime with other Study Buddies in your class? Select one of your courses, pick a time, send a location (or Zoom link), and start studying! </p>
                </ReactTooltip>
            </Paper>
        </div>
    );
}

export default CreateGroupDashboard;