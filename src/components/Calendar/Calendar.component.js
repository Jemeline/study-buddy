import React, {useEffect, useState}from 'react';
import { render } from 'react-dom'
// import FullCalendar from 'fullcalendar/react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { get_initial_events, createEventId } from './event-utils';
import {apiGetStudentProfile, apiGetCoursesById, apiGetCourseById} from '../../utils/api'
import { getUser } from '../../utils/common';

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

function Calendar(user) {

        
        const [ events, setEvents ] = useState(null);
        
        // console.log(user)
        // useEffect(async () => {
        //     try {    
        //         console.log("here1")
        //         const profile = await apiGetStudentProfile(user['_id'])
        //         profile.then( async res => {
        //             console.log("here2")
        //             console.log(res)
        //             const schedule = await apiGetCourseById(res.courseSchedule[1])
        //             schedule.then(
        //                 res => {
        //                     console.log("here3")
        //                     console.log(res)
        //                     setEvents(res.data)
        //                     console.log(events)
        //                 })
        //         // const schedule = await getCurrentStudent(user['_id'])
        //         // console.log(schedule)
        //         // setEvents(schedule)
                
        //         });
        //     } catch(error){
        //         console.log(error)
        //     }

        //     // get_initial_events(user).then(res =>{
        //     //     console.log(res)
        //     //     setEvents(res)
        //     // })
        // }, []);


        const [loading, setLoading] = useState(false);
        function createData(id,title,start){
            return({id: id, title: title, start: start})
        }
        useEffect(async () => {
            try{
                getCurrentStudent(user.user._id)
                setLoading(true)
                apiGetStudentProfile(user.user._id).then((res) => {
                    apiGetCourseById(res.data.courseSchedule[1]).then((res) => {
                        console.log(res)
                        if (res.data!= null){
                            setEvents([createData(createEventId(),res.data.courseSubject + " " + res.data.courseNumber + " - " + res.data.courseTitle,"2021-04-13 " + "T12:00:00")]);
                            setLoading(false)
                            console.log(events)
                        }
                    })
                })
                
                // const event = await get_initial_events(user);
                // const current_student = await getCurrentStudent(JSON.parse(getUser())._id);
                // //const classes = await 
                // console.log(classes)
                
                // console.log(createData(createEventId(),classes.data.courseSubject + " " + classes.data.courseNumber + " - " + classes.data.courseTitle,"2021-04-13 " + "T12:00:00"));
               
                
                // console.log(events);
                // console.log(classes)
                
            } catch(error){
                console.log(error)
            }
        }, [])

    //console.log(events)

    
    // let classInfo = events

    // const INITIAL_EVENTS = [];

    // for (let i=0; i < 1; i++) {
    //     INITIAL_EVENTS.push({
    //     id: createEventId(),
    //     title: classInfo["courseSubject"] + " " + classInfo["courseNumber"] + " - " + classInfo["courseTitle"],
    //     start: "2021-04-13 " + "T12:00:00"
    //     })}
    
    
    // await get_initial_events(user)
    //console.log(events)
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
                initialEvents={events}
                // initialEvents={[{
                //     id: createEventId(),
                //     title: 'Timed event',
                //     start: '2021-04-13' + 'T12:00:00'
                // }]}
                />
        </div>

    ) 
}

async function getCurrentStudent(userId) {
    try {
    //   const profile = await apiGetStudentProfile(userId);
    //   return profile.data
        apiGetStudentProfile(userId).then( async res => {
                    console.log(res.data.courseSchedule[0])
                    apiGetCourseById(res.data.courseSchedule[0]).then(
                        res => {
                            console.log(res)
                            return res.data
                            //console.log(events)
                        })
                
                });
    } catch (err){console.log(err) }
}

export default Calendar;