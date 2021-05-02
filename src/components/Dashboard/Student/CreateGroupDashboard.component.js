import React, { useState,useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { colorPalette } from '../../../utils/design';
import { apiGetCourseById, apiGetStudentProfile, apiGetStudentProfiles, apiGetStudents, sendMassStudyInvite } from '../../../utils/api';
import { getUser } from '../../../utils/common';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReactLoading from "react-loading";

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
        <div>{(loading) ? <div style={{backgroundColor:'white',zIndex:-1,height:'350px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
        (error) ? <div style={{backgroundColor:'white',zIndex:-1,height:'350px',display:'flex',justifyContent:'center',alignItems: 'center',flexDirection:'column',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={'red'}/><p>Oops... Something Went Wrong</p></div>:
            <Paper style={{overflow:'auto',height:'350px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div style={{height:'350px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <h5 style={{fontFamily: 'Garamond, serif',fontSize:'20px',marginTop:'20px', marginBottom:'10px',cursor:'pointer'}}><strong>Send A Study Invite</strong></h5>
                    <strong><p style={{color: colorPalette.secondaryA,margin:0,cursor:'pointer'}} onClick={()=> setSuccessMessage('')}>{successMessage}</p></strong>
                    <p style={{margin:0}} onClick={()=> setErrorMessage('')}>{errorMessage}</p>
                    <form onSubmit={handleSubmit}>
                        <div style={{display: "flex", flexDirection: "column", alignContent: "center",justifyContent:'space-between',marginTop:'10px'}}>
                            <div style={{height:'30px',margin:'10px'}} >
                                <DateTimePicker id="when" required minDetail="year" value={datetime} disableClock={true} onChange={handleDateTimeChange} />
                            </div>
                            <select style={{height:'30px',margin:'10px'}} id="class" required onChange={handleClassChange} name="chosenClass" >
                                    <option value="" defaultValue key="placeholder">Choose a class...</option>
                                    {myClasses.map(c => <option key={c[0]} value={[c[0], c[1]]}>{c[1]}</option>)}
                                </select>
                            <input style={{height:'30px',margin:'10px'}} onChange={handleLocationChange} required type="text" id="location" name="location" placeholder="Enter a location..." /> 
                        </div>
                        <button type="submit" style={{width: "25%", backgroundColor: colorPalette.secondary,color:'white',marginTop:'20px', marginBottom:'20px'}}><SendRoundedIcon /></button>
                    </form>
                </div>
            </Paper>}
        </div>
    );
}

export default CreateGroupDashboard;