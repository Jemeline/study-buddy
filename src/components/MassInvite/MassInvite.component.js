import { React, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useForm } from 'react-hook-form';
import { colorPalette } from '../../utils/design';
import { apiGetCourseById, apiGetStudentProfile } from '../../utils/api';
import { getUser } from '../../utils/common';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

function MassStudyInvite() {

    const [user, setUser] = useState(JSON.parse(getUser()));
    const [chosenClass, setChosenClass] = useState(null);
    const [myClasses, setMyClasses] = useState([]);
    const [message, setMessage] = useState("");
    const {register, handleSubmit} = useForm();


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

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <div style={{backgroundColor: colorPalette.secondary, width: "80vw", height: "80vh", display: "flex", justifyContent: "center", margin: "5vh 10vw", position: "relative"}}>
            <Paper style={{backgroundColor: colorPalette.primary, margin: "10px", position: "absolute", width: "80%"}}>
                <h1>Let people know you want to study!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select name="class" onChange={(e) => {
                        setChosenClass(e.target.value);
                        console.log(e.target.value);
                        }}>
                        {myClasses.map(c => <option  key={c[0]}>{c[1]}</option>)}
                    </select>
                    <textarea name="message" placeholder={"What do you want to say..."} onChange={(e) => {setMessage(e.target.value)}} ></textarea>
                    <button type="submit"><SendRoundedIcon /></button>
                </form>
            </Paper>
        </div>
    )
}

export default MassStudyInvite;