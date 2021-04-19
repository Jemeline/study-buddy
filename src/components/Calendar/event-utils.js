import {apiGetStudentProfile, apiGetCoursesById, apiGetCourseById} from '../../utils/api'
//import { formatRange } from '@fullcalendar/core'
//import {getUser} from '../../utils/commons'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
console.log(todayStr)

export async function get_initial_events({user}) {

  const current_student = await getCurrentStudent(user['_id']);

  //console.log(current_student)
  //console.log(current_student.courseSchedule)

  const classes = await apiGetCourseById(current_student.courseSchedule[1])
  let classInfo = classes.data
  
  //const classes = await apiGetCoursesById(current_student.courseSchedule)
  //console.log(classes.data)
  //console.log(classes.data.courseSchedule)

  const INITIAL_EVENTS = [];

  for (let i=0; i < 1; i++) {
    INITIAL_EVENTS.push({
      id: createEventId(),
      title: classInfo["courseSubject"] + " " + classInfo["courseNumber"] + " - " + classInfo["courseTitle"],
      start: "2021-04-13 " + "T12:00:00"
    })}
    //   {
    //     id: createEventId(),
    //     title: 'curr',
    //     start: todayStr
    //   },
    //   {
    //     id: createEventId(),
    //     title: 'Timed event',
    //     start: todayStr + 'T12:00:00'
    //   }
    // ] 
  //}
  // const INITIAL_EVENTS = [
  //   {
  //     id: createEventId(),
  //     title: 'All-day event',
  //     start: todayStr
  //   },
  //   {
  //     id: createEventId(),
  //     title: 'Timed event',
  //     start: todayStr + 'T12:00:00'
  //   }
  // ]
  //console.log(INITIAL_EVENTS)
  return INITIAL_EVENTS;
}

async function getCurrentStudent(userId) {
try {
  const profile = await apiGetStudentProfile(userId);
  return profile.data
} catch (err){console.log(err) }
}

export function createEventId() {
  return String(eventGuid++)
}
