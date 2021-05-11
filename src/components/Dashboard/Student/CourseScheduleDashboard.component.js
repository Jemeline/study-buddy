/* Author: Jada Pfeiffer
Purpose: Component used to display student course schedule on Dashboard
Shows course name, number, subject, and instructors
Route: https://study-buddy-d452c.web.app/dashboard/student
*/
import React, { useState,useEffect } from "react";
import { getUser, storeTabValue } from "../../../utils/common";
import {apiGetStudentProfiles,apiGetCoursesById} from "../../../utils/api";
import {colorPalette} from "../../../utils/design";
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactLoading from "react-loading";

function CourseScheduleDashboard() {
    const user = JSON.parse(getUser());
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rows, setRows] = useState([]);
    const [courses, setCourses] = useState([]);
    
    useEffect(async () => {
        try{
          setLoading(true);
          setError(false);
          const profiles = await apiGetStudentProfiles();
          const courseSchedule = await profiles.data.filter(e=>e._userId === user._id)[0].courseSchedule;
          const userCourseSchedule = await apiGetCoursesById(courseSchedule);
          setCourses(userCourseSchedule.data);
          setLoading(false);
        } catch (err){
          setError(true);
          setLoading(false);
        }  
    }, []);

    return (
        <div>
            {loading ? <div style={{backgroundColor:'white',zIndex:-1,height:'350px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
            <Paper style={{overflow:'auto',width:"100%",height:'350px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer'}} onClick={()=>{storeTabValue(3);history.push('/student-profile')}}>
                <TableContainer style={{height:'450px'}}>
                    <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan="5" style={{ "text-align": "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>My Courses</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Course</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Instructor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hidden={!error}><TableCell colSpan="5" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
                        <TableRow hidden={courses.length>0 || error}><TableCell colSpan="5" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Add A Course To Your Schedule</strong></TableCell></TableRow>
                        {(!loading && !error) ? 
                        courses.map((row) => (
                        <TableRow hover key={row._id}>
                            <TableCell align="left">{row.courseSubject} {row.courseNumber}-{String(row.courseSection).padStart(3, '0')}</TableCell>
                            <TableCell align="left">{row.courseTitle}</TableCell>
                            <TableCell align="left">{row.courseSchedule[0].day} {(row.courseSchedule[0].time === 'TBA') ? "TBA": processTime(row.courseSchedule[0].time)}</TableCell>
                            <TableCell align="left">{row.courseInstructor}</TableCell>
                        </TableRow>
                        )): <TableRow/>}
                    </TableBody>
                    </Table>
                </TableContainer> 
            </Paper>} 
        </div>
    );
}

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
function createData(name, email, phone, user,profile) {
    return { name, email, phone, user, profile};
};

export default CourseScheduleDashboard;