import React, {useState} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {colorPalette} from '../../utils/design';
import {zeroPad} from '../../utils/common';

function Course({course}){
    const [isShown, setIsShown] = useState(false);
    return <div style={{height:"100%",backgroundColor:colorPalette.primary,borderRadius: 8, textAlign:"left",paddingLeft:"7%",paddingRight:"2%"}}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        >
        <div style={{float:"right"}}>
            <IconButton style={{ color: colorPalette.secondaryA }}>
                <AddCircleIcon/>
            </IconButton>
        </div>
        <br></br>
        <h6 style={{color:colorPalette.white}} hidden={isShown}>{course.courseSubject} {course.courseNumber}{course.courseIsHonors ? "H" : course.courseIsLab ? "L" : ""}-{zeroPad(course.courseSection,3)}</h6>
        <p style={{color:colorPalette.white}} hidden={isShown}>{course.courseTitle}</p>
        <h6 hidden={!isShown} style={{listStyleType:"none",margin:0}}>{course.courseSchedule.map((ele)=> <li style={{color:colorPalette.white}}><em>{ele.day}</em> {(ele.time.includes('TBA')) ? "TBA": processTime(ele.time)}</li>)}</h6>
        <p hidden={!isShown} style={{listStyleType:"none",margin:0}}>{course.courseInstructor.map((ele)=> <li style={{color:colorPalette.white}}>{ele.replace(/,/g, ', ').concat(" ")}</li>)}</p>
        <br hidden={!isShown}></br>
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