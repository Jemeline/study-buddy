/* Author: Jada Pfeiffer
Purpose: Allows student to browse other students by courses in common.
Student can select course from dropdown prepopulated with their course
schedule and filter students based on those in the same class
Route: https://study-buddy-d452c.web.app/dashboard/student
*/
import React, { useState,useEffect } from "react";
import { getUser, capitalizeFirst } from "../../../utils/common";
import {apiGetStudents,apiGetStudentProfiles,apiGetCoursesById} from "../../../utils/api";
import {colorPalette} from "../../../utils/design";
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactLoading from "react-loading";
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function StudentClassListDashboard() {
    const history = useHistory();
    const user = JSON.parse(getUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowsFiltered, setRowsFiltered] = useState([]);
    const [courses, setCourses] = useState([]);

    
    useEffect(async () => {
        try{
            setLoading(true);
            setError(false);
            const profiles = await apiGetStudentProfiles();
            const courseSchedule = await profiles.data.filter(e=>e._userId === user._id)[0].courseSchedule;
            const userCourseSchedule = await apiGetCoursesById(courseSchedule);
            setCourses(userCourseSchedule.data.map(e=>{return {label:e.courseSubject+' '+e.courseNumber,value:e._id}}));
            const data = await apiGetStudents();
            setRows(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,profiles.data.find(element => element._userId === e._id))));
            setRowsFiltered(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,profiles.data.find(element => element._userId === e._id))));
            setLoading(false);
        } catch (err){
            setError(true);
            setLoading(false);
        }  
    }, []);

    return (
        <div>
            {loading ? <div style={{backgroundColor:'white',zIndex:-1,height:'450px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
            <Paper style={{overflow:'auto',width:"100%",height:'450px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <TableContainer style={{height:'450px'}}>
                    <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell colspan="3" style={{ "text-align": "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>Browse Users By Course</strong><InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="class-list"/></TableCell>
                            <TableCell colspan="2" style={{ "text-align": "right",fontSize:'20px',fontFamily: 'Garamond, serif' }}>
                                <select style={{backgroundColor:colorPalette.white,padding:'1px',outlineColor:colorPalette.secondary}}
                                    onChange={(val) => {
                                        if (val.target.value === ''){
                                            setRowsFiltered(rows.filter((row)=>!((row.user._id ===JSON.parse(getUser())._id) || row.user.disabled )).filter(e=>typeof(e.profile)!=='undefined'));
                                        }else {
                                            setRowsFiltered(rows.filter((row)=>!((row.user._id ===JSON.parse(getUser())._id) || row.user.disabled)).filter(e=>typeof(e.profile)!=='undefined').filter(e=>e.profile.courseSchedule.includes(val.target.value)));
                                        }
                                    }}>
                                    <option value="" defaultValue key="placeholder">Choose a class...</option>
                                    {courses.map(e=><option key={e.value} value={e.value}>{e.label}</option>)}
                                </select>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width='5vw'></TableCell>
                            <TableCell align="left" width='5vw'>Name</TableCell>
                            <TableCell align="left" width='7vw'>Email</TableCell>
                            <TableCell align="left">Program of Study</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hidden={!error}><TableCell colSpan="5" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
                        <TableRow hidden={rowsFiltered.length>0 || error}><TableCell colSpan="5" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Could Not Find Any Users In This Course</strong></TableCell></TableRow>
                        {(!loading && !error) ? 
                        rowsFiltered.map((row) => (
                        <TableRow hover key={row.user._id}>
                            <TableCell align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '5vw',width:"5vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '5vw',width:"5vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{(typeof(row.profile)==='undefined')? '':(row.profile.studentType === 'undergraduate')?row.profile.programOfStudy.major:row.profile.programOfStudy.graduateProgram[0]}</TableCell>
                        </TableRow>
                        )): <TableRow/>}
                    </TableBody>
                    </Table>
                </TableContainer> 
                <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="class-list" place="top" effect="float">
                    <p style={{margin:0,width:'250px'}}>Filter by your course schedule to find out who is in your classes. Select a course to get started.</p>
                </ReactTooltip>
            </Paper>} 
        </div>
    );
}

function createData(name, email, phone, user,profile) {
    return { name, email, phone, user, profile};
};

export default StudentClassListDashboard;