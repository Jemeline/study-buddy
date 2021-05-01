import { React, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useForm, Controller } from 'react-hook-form';
import { colorPalette } from '../../utils/design';
import { apiGetCourseById, apiGetStudentProfile, apiGetStudentProfiles, apiGetStudents, sendMassStudyInvite } from '../../utils/api';
import { getUser } from '../../utils/common';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Calendar from 'react-calendar';
import { CalendarDataManager } from '@fullcalendar/common';
import { computeHeadingLevel } from '@testing-library/dom';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';


function MassStudyInvite() {

    const [user, setUser] = useState(JSON.parse(getUser()));
    const [myClasses, setMyClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    // const {register, handleSubmit, control, formState: { errors }} = useForm();
    const [chosenClassId, setChosenClassId] = useState("");
    const [chosenClassClean, setChosenClassClean] = useState("");
    const [datetime, setDatetime] = useState(new Date());
    // const [date, setDate] = useState(new Date());
    // const [time, setTime] = useState("");
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
        
        const formattedMessage = `${user.first.charAt(0).toUpperCase()}${user.first.slice(1).toLowerCase()} ${user.last.charAt(0).toUpperCase()}${user.last.slice(1).toLowerCase()} invited you to study for ${chosenClassClean}! \n \n Date: ${datetime.toString().slice(0, 15)} \n Time: ${datetime.toString().slice(15, 21)} \n Location: ${location} \n \n ${message}`
        console.log(formattedMessage);

        let data = {classmates, formattedMessage};

        try {
            const res = await sendMassStudyInvite(data);
            console.log(res);
            setSuccessMessage("Your email was sent!");
            setErrorMessage("");
        } catch (err) {
            console.log(err);
            setSuccessMessage("");
            setErrorMessage("There was a problem sending your email. Try again");
        }
    }

    // function handleDateChange(date) {
    //     setDate(date);
    //     console.log(date.toString().slice(0, 15));
    // }

    // function handleTimeChange(time) {
    //     setTime(time);
    //     console.log(time);
    // }

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
        <div style={{boxSizing: "border-box", display: "flex", backgroundColor: colorPalette.gray, height: "92vh"}}>
            <Grid container >
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={4} style={{display: "flex"}}>
                    <Paper elevation={8} style={{display: "flex", flexDirection: "column", backgroundColor: colorPalette.white, width: "40vw", height: "50%", justifyContent: "center", alignSelf: "center"}}>
                        <p style={{}}>What better way to start a study group than by inviting your whole class! </p>
                        <hr style={{width: "80%", border: `2px solid ${colorPalette.secondary}`}}></hr>
                        <p style={{}}>Select a class, set the details, write a message, and an email will be sent to everyone in the selected class!</p>
                        <hr style={{width: "80%", border: `2px solid ${colorPalette.secondary}`}}></hr>
                        <p style={{}}>Happy Studying!</p>
                    </Paper>                    
                </Grid>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={5} style={{display: "flex"}}>
                    <Paper elevation={5} style={{display: "flex", flexDirection: "column", backgroundColor: colorPalette.white, height: "90%", width: "50vw", justifyContent: "flex-start", alignItems: "center", alignSelf: "center"}}>
                        <form onSubmit={handleSubmit} style={{height: "60%", width: "80%", margin: "10% auto"}}>
                            <div style={{display: "flex", flexDirection: "column", alignContent: "flex-start"}}>
                                <select required onChange={handleClassChange} name="chosenClass" style={{padding: "5px"}} >
                                    <option value="" defaultValue key="placeholder">Choose a class...</option>
                                    {myClasses.map(c => <option key={c[0]} value={[c[0], c[1]]}>{c[1]}</option>)}
                                </select>
                                {/* {errors.chosenClass && <p style={{margin: "0", alignSelf: "flex-start"}}><strong>Please choose a class</strong></p>} */}
                                <hr style={{margin: "8px auto"}}></hr>
                                {/* <Controller as={DatePicker} control={control} name="chosenDate" style={{width: "50%"}}></Controller> */}
                                {/* <DatePicker onChange={handleChangeDate} name="chosenDate" style={{widht: "50%"}} /> */}
                                {/* <Calendar required onClickDay={handleDateChange} value={date} /> */}
                                {/* <select style={{width: "50%", padding: "5px"}}>
                                    <option value="">Choose a date...</option>
                                </select> */}
                                {/* {errors.chosenClass && <p style={{margin: "0", alignSelf: "flex-start"}}><strong>Please choose a class</strong></p>} */}
                                {/* <TimePicker disableClock={true} required onChange={handleTimeChange} name="chosenTime" style={{width: "50%"}}/> */}
                                <DateTimePicker required minDetail="year" value={datetime} disableClock={true} onChange={handleDateTimeChange} />
                                {/* <select style={{width: "50%", padding: "5px"}}>
                                    <option value="">Choose a time...</option>
                                </select> */}
                                {/* {errors.chosenClass && <p style={{margin: "0", alignSelf: "flex-start"}}><strong>Please choose a class</strong></p>} */}
                                <hr style={{margin: "8px auto"}}></hr>
                                <input onChange={handleLocationChange} type="text" id="location" name="location" placeholder="Enter a location..." />
                                {/* {errors.chosenClass && <p style={{margin: "0", alignSelf: "flex-start"}}><strong>Please choose a class</strong></p>} */}
                                <hr style={{margin: "8px auto"}}></hr>
                            </div>
                            <textarea onChange={handleMessageChange} name="message" placeholder={"Write an optional message..."} style={{width: "100%", height: "30%", margin: "auto", resize: "none"}} ></textarea>
                            {/* {errors.message && <p style={{marginTop: "0px"}}><strong>Please write a message</strong></p>} */}
                            {/* <div> */}
                                <button type="submit" style={{width: "25%", backgroundColor: colorPalette.primary}}><SendRoundedIcon /></button>
                            {/* </div> */}
                            <p>{successMessage}</p>
                            <p>{errorMessage}</p>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>
        </div>
    )
}

export default MassStudyInvite;