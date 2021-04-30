import React, {useEffect, useState}from 'react';
import FullCalendar, { formatDate, getDayClassNames, getSectionClassNames } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {apiGetStudentProfile, apiGetCoursesById, apiGetCourseById} from '../../utils/api';
import tippy, {followCursor} from 'tippy.js';
import 'tippy.js/dist/tippy.css';

let semesterStart = "2021-01-19"
let semesterEnd = "2021-05-05"
let eventGuid = 0

function Calendar(user) {
    
    function createEventId() {
        return String(eventGuid++)
    }

    const [ iEvents, setEvents ] = useState(null);
    const [loading, setLoading] = useState(true);

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
        if (dayString == 'TH') { return [2,4]} else
        if (dayString == 'F') {return [5]} else 
        if (dayString == 'M') {return [1]} else 
        if (dayString == 'T') {return [2]} else 
        if (dayString == 'W') {return [3]} 
        else { return [1]}
    }
        
       
    if (!loading) {
        return (
            <div className='demo-app-main' style={{width:'80vw'}}>
                    <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    initialEvents={iEvents}
                    height='70vh'
                    eventMouseEnter={(info) =>{
                        console.log(info.event.title);
                        tippy(info.el, {
                            content: info.event.title,
                            followCursor: true,
                            plugins: [followCursor],
                        })
                    }}
                    />
            </div>
        ) 
    } else {
        return null
    }  
}

export default Calendar;