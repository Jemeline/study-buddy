/* Author: Jada Pfeiffer
Purpose: Component used to display courses inside the CouresSearchImproved component
Displays course title, number, time, and instructors.
Route: https://study-buddy-d452c.web.app/student-survey
*/
import React, {useState,useEffect} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import {colorPalette} from '../../utils/design';
import {zeroPad} from '../../utils/common';
import {storeCourseSchedule} from '../Survey/Student/utils/common';

function Course({course,courseSchedule,setCourseSchedule,hideAddButton}){
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
      storeCourseSchedule(courseSchedule);
    }, [courseSchedule]);

    return <div style={{height:"100%",backgroundColor:colorPalette.secondaryA,borderRadius: 8, textAlign:"left",paddingLeft:"7%",paddingRight:"2%"}}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        >
        <div hidden={hideAddButton} style={{float:"right"}} onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
            <IconButton 
              style={{ color: colorPalette.secondary }}
              onClick={()=> {
                if (!courseSchedule.includes(course)){
                  setCourseSchedule(prevArray => [...prevArray, course]);
                }
              }
              }
            >
                <AddCircleIcon/>
            </IconButton>
        </div>
        <div hidden={!hideAddButton} style={{float:"right"}} onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
            <IconButton 
              style={{ color: colorPalette.secondary }}
              onClick={()=> {
                setCourseSchedule(courseSchedule.filter(item => JSON.stringify(item) !== JSON.stringify(course)));
                }
              }
            >
                <RemoveCircleIcon/>
            </IconButton>
        </div>
        <br></br>
        <h6 style={{color:colorPalette.secondary,fontSize:'1.4vw'}} hidden={isShown}>{course.courseSubject} </h6>
        <h6 style={{color:colorPalette.secondary,fontSize:'1.25vw'}} hidden={isShown}>{course.courseNumber}{course.courseIsHonors ? "H" : course.courseIsLab ? "L" : ""}-{zeroPad(course.courseSection,3)}</h6>
        <p style={{color:colorPalette.secondary, fontSize:'0.8vw',marginLeft:'0.2vw',marginRight:'0.2vw'}} hidden={isShown}>{course.courseTitle}</p>
        <h6 hidden={!isShown} style={{listStyleType:"none",margin:0,fontSize:'1.25vw',paddingBottom:'1vh',marginLeft:'0.2vw',marginRight:'0.2vw'}}>{course.courseSchedule.map((ele)=> <li style={{color:colorPalette.secondary}}><em>{ele.day}</em> {(ele.time.includes('TBA')) ? "TBA": processTime(ele.time)}</li>)}</h6>
        <p hidden={!isShown} style={{listStyleType:"none",margin:0,fontSize:'1vw',paddingBottom:'1vh',marginLeft:'0.2vw',marginRight:'0.2vw',fontSize:'0.8vw'}}>{course.courseInstructor.map((ele)=> <li style={{color:colorPalette.secondary}}>{ele.replace(/,/g, ', ').concat(" ")}</li>)}</p>
    </div>
};

function processTime(timeString){
    const timeArr = timeString.split(" - ");
    const start = timeArr[0];
    const end = timeArr[1];
    const convertedStart = convertTime(start);
    const convertedEnd = convertTime(end);
    return convertedStart.concat('-').concat(convertedEnd);
};

function convertTime(timeString){
  timeString = timeString.split(':');
  if ((timeString[0].charAt(0) == 1 && timeString[0].charAt(1) > 2) || (timeString[0].charAt(0) == 2)) {
    return (timeString[0] - 12) + ':' + timeString[1] + 'pm';
  } else {
    return timeString.join(':') + 'am';
  }
};


export default Course;