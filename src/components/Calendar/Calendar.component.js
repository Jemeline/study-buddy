import React, {useEffect, useState}from 'react';
import FullCalendar, { formatDate, getDayClassNames, getSectionClassNames } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {apiGetStudentProfile, apiGetCoursesById, apiGetCourseById} from '../../utils/api'

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
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
            console.log("loading")
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
        let events = []
        for(let i = 0; i < data.length; i++) {
            let timeObject = getStartTime(data[i].courseSchedule[0])
            let singleEvent = {
                id: createEventId(),
                title: data[i].courseTitle,
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
        if (dayString == 'F') {return [5]}
        else { return [0]}
    }
        
       
    if (!loading) {
        return (
            <div className='demo-app-main'>
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
                    />
            </div>
        ) 
    } else {
        return null
    }
    
}

export default Calendar;