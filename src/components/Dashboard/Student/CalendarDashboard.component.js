import React, {useEffect, useState}from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import {apiGetStudentProfile, apiGetCoursesById} from '../../../utils/api';
import tippy, {followCursor} from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';

function CalendarDashboard(user) {
    function createEventId() {return String(eventGuid++)}
    const history = useHistory();
    const [ iEvents, setEvents ] = useState(null);
    const [loading, setLoading] = useState(true);
    let semesterStart = "2021-01-19";
    let semesterEnd = "2021-06-05";
    let eventGuid = 0;

    useEffect(async () => {
        apiGetStudentProfile(user.user._id).then((res) => {
            apiGetCoursesById(res.data.courseSchedule).then((res) => {
                if (res.data!= null){
                    setEvents(getEvents(res.data))
                    setLoading(false)
                }
            })
        
        })
    }, [])

    function getEvents(data) {
        let events = [];
        for(let i = 0; i < data.length; i++) {
            let timeObject = getStartTime(data[i].courseSchedule[0])
            let singleEvent = {
                id: createEventId(),
                title: data[i].courseSubject + ' ' + data[i].courseNumber +'-' + String(data[i].courseSection).padStart(3, '0'),
                daysOfWeek: timeObject.daysOfWeek,
                startTime: timeObject.startTime,
                endTime: timeObject.endTime,
                startRecur: semesterStart,
                endRecur: semesterEnd,
                allDay: false
            }
            events.push(singleEvent)
        }
        return events
    }

    function getStartTime(timeArray) {
        let array = timeArray.time.split(" ")
        let timeObject = {
            daysOfWeek: getDays(timeArray.day),
            startTime: array[0] + ':00',
            endTime: array[2] + ':00'
        }
        return timeObject
    }

    function getDays(dayString) {
        if (dayString == 'MW') { return [1,3]} else
        if (dayString == 'MWF') { return [1,3,5]} else 
        if (dayString == 'TH') { return [4]} else
        if (dayString == 'TUTH') { return [2,4]} else
        if (dayString == 'F') {return [5]} else 
        if (dayString == 'M') {return [1]} else 
        if (dayString == 'T') {return [2]} else 
        if (dayString == 'W') {return [3]} 
        else { return [1]}
    }
        
       
    if (!loading) {
        return (
            <Paper style={{overflow:'auto',height:'350px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div style={{width:'100%'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:0}}>
                    <h6 style={{height:'25px',marginLeft:'5px',marginTop:'5px',marginBottom:0,fontSize:'20px',fontFamily: 'Garamond, serif'}}><strong>My Weekly Schedule</strong></h6>
                </div>
                
                <FullCalendar
                    plugins={[listPlugin]}
                    headerToolbar={false}
                    initialView='listWeek'
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    initialEvents={iEvents}
                    height='320px'
                    eventMouseEnter={(info) =>{
                        tippy(info.el, {
                            content: info.event.title,
                            followCursor: true,
                            plugins: [followCursor],
                        })
                    }}
                    />
            </div>
        </Paper>
        ) 
    } else {
        return (
        <Paper style={{overflow:'auto',height:'350px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:'100%'}}>
                <h6 style={{height:'25px',margin:0}}>My Weekly Schedule</h6>
            </div>
        </Paper>
        )
    }  
}

export default CalendarDashboard;