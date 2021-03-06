// Written by Randy Sievers
// A form that students can fill out with a class chosen from their class schedule, a time, date, location, and possibly a message.
// On submission, an email is sent to all Study Buddy users in the chosen class with the details for a study session.

import { React, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { colorPalette } from '../../utils/design';
import { apiGetCourseById, apiGetStudentProfile, apiGetStudentProfiles, apiGetStudents, sendMassStudyInvite } from '../../utils/api';
import { getUser } from '../../utils/common';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


function MassStudyInvite() {
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

        
        // Use the form data to make a backend request that will handle the rest
        try {
            const res = await sendMassStudyInvite(info);
            console.log(res);
            setSuccessMessage("Your email was sent!");
            setErrorMessage("");
        } catch (err) {
            console.log(err);
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
        <div style={{boxSizing: "border-box", display: "flex", alignContent: "stretch", backgroundColor: colorPalette.gray, height: "92vh"}}>
            <Grid container justify="center">
                <Grid item xs={12} md={4}  style={{display: "flex"}}>
                    <Paper elevation={5} style={{overflow: "scroll", marginLeft: "2vw", display: "flex", flexDirection: "column", backgroundColor: colorPalette.white, height: "75vh", width: "100%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center"}}>
                        <form onSubmit={handleSubmit} style={{height: "75vh", width: "100%", margin: "10% auto",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <h5>Send A Study Invite<InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="mass-invite-1"/></h5>
                            <div style={{display: "flex", flexDirection: "column", alignContent: "flex-start", width: "75%"}}>
                                <label style={{alignSelf: "flex-start", marginBottom: "0"}} for="class">Class:<InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="mass-invite-2"/></label>
                                <select id="class" required onChange={handleClassChange} name="chosenClass" style={{padding: "5px"}}>
                                    <option value="" defaultValue key="placeholder">Choose a class...</option>
                                    {myClasses.map(c => <option key={c[0]} value={[c[0], c[1]]}>{c[1]}</option>)}
                                </select>
                                <hr style={{margin: "10px auto"}}></hr>
                                <label style={{alignSelf: "flex-start", marginBottom: "0"}} for="when">When:</label>
                                <DateTimePicker id="when" required minDetail="year" value={datetime} disableClock={true} onChange={handleDateTimeChange} />
                                <hr style={{margin: "8px auto"}}></hr>
                                <label style={{alignSelf: "flex-start", marginBottom: "0"}} for="location">Where:</label>
                                <input onChange={handleLocationChange} required type="text" id="location" name="location" placeholder="Enter a location (or zoom link)..." style={{padding: "5px"}}/>
                                <hr style={{margin: "10px auto"}}></hr>
                            
                            <textarea onChange={handleMessageChange} name="message" placeholder={"Add an additional message here..."} style={{width: "100%", height: "30%", margin: "auto", resize: "none"}}></textarea>
                            </div>
                            <hr style={{margin: "10px auto"}}></hr>
                            <button data-tip data-for="mass-invite-3" type="submit" style={{width: "25%", backgroundColor: colorPalette.primary}}><SendRoundedIcon /></button>
                            <strong><p style={{color: colorPalette.secondaryA}}>{successMessage}</p></strong>
                            <p>{errorMessage}</p>
                        </form>
                    </Paper>
                    <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="mass-invite-1" place="top" effect="float">
                        <p style={{margin:0,width:'250px'}}>What better way to start a study group than by inviting your whole class!</p>
                    </ReactTooltip>
                    <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="mass-invite-2" place="top" effect="float">
                        <p style={{margin:0,width:'250px'}}>Select a class, set the details, write a message, and an email will be sent out to everyone in the selected class inviting them to join your for a study session.</p>
                    </ReactTooltip>
                    <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="mass-invite-3" place="top" effect="float">
                        <p style={{margin:0,width:'150px'}}>Happy Studying!</p>
                    </ReactTooltip>
                </Grid>
            </Grid>
        </div>
    )
}

export default MassStudyInvite;