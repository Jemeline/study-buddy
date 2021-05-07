/* Author: Jada Pfeiffer
Purpose: Component for viewing tutors who tutor for the classes a student
is currently in. Shows tutor contact info, rating, and courses tutored.
Route: https://study-buddy-d452c.web.app/dashboard/student
*/
import React, { useState,useEffect } from "react";
import { getUser, capitalizeFirst } from "../../../utils/common";
import {apiGetStudentProfiles,getUsers,getAllAds,apiGetCoursesById} from "../../../utils/api";
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

function SuggestedTutorsDashboard() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(getUser()));
    const [tutors,setTutors] = useState([]);
    const [allAds,setAllAds] = useState([]);
    const [error,setError] = useState(false);
    
    function getArraysIntersection(a1,a2){
        return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
    }
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    useEffect(async () => {
        try{
          setLoading(true);
          setError(false);
          const users = await getUsers();
          const ads = await getAllAds();
          const courses = await apiGetStudentProfiles();
          const courseSchedule = await courses.data.filter(e=>e._userId === user._id)[0].courseSchedule;
          const tutors = users.data.filter(e=>e.role==='tutor');
          const userCourseSchedule = await apiGetCoursesById(courseSchedule);
          const userCourses = await userCourseSchedule.data.map(e=>e.courseSubject+' '+ e.courseNumber);
          const suggestedTutors = await ads.data.filter(e=> getArraysIntersection(userCourses,e.courses).length>0);
          const s = await suggestedTutors.map(e=>{
            const user = tutors.filter(v=> e.tutorEmail === v.email)[0];
            return {name:capitalizeFirst(user.first) + ' '+ capitalizeFirst(user.last),email:user.email,user:user,ad:e}
          })
          const uniqueSuggestedTutors = getUniqueListBy(s,'email');
          setTutors(await uniqueSuggestedTutors);
          setAllAds(await ads.data);
          setLoading(false);
        } catch (err){
          console.log(err);
          setError(true);
          setLoading(false);
        }  
    }, []);

    return (
        <div>
            {loading ? <div style={{backgroundColor:'white',zIndex:-1,height:'450px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
            <Paper style={{overflow:'auto',width:"100%",height:'450px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer'}} onClick={()=>history.push('/find-tutors')}>
                <TableContainer style={{height:'450px'}}>
                    <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan="5" style={{ "text-align": "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>Suggested Tutors</strong><InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="suggested-tutors"/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width='3vw'></TableCell>
                            <TableCell align="left" width='3vw'>Name</TableCell>
                            <TableCell align="left" width='7vw'>Email</TableCell>
                            <TableCell align="left" width='7vw'>Rating</TableCell>
                            <TableCell align="left" width='7vw'>Courses</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hidden={!error}><TableCell colSpan="5" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
                        <TableRow hidden={tutors.length>0 || error}><TableCell colSpan="5" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>No Tutors Currently Fit Your Needs</strong></TableCell></TableRow>
                        {(!loading && !error) ? 
                        tutors.map((row) => (
                        <TableRow hover key={row.user._id}>
                            <TableCell align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '5vw',width:"5vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '5vw',width:"5vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.user.email}</TableCell>
                            <TableCell align="left">{(allAds.filter(e=>e.tutorEmail===row.email).map(v=> v.ratings).flat().length===0)?'Unrated':(Math.round(allAds.filter(e=>e.tutorEmail===row.email).map(v=> v.ratings).flat().reduce((a, b) => a + b) / (allAds.filter(e=>e.tutorEmail===row.email).map(v=> v.ratings).flat()).length * 100)/100)}</TableCell>
                            <TableCell align="left">{[...new Set(allAds.filter(e=>e.tutorEmail===row.email).map(v=> v.courses).flat())].map(v=><p style={{margin:0}}>{v}</p>)}</TableCell>
                        </TableRow>
                        )): <TableRow/>}
                    </TableBody>
                    </Table>
                </TableContainer> 
                <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="suggested-tutors" place="top" effect="float">
                    <p style={{margin:0,width:'250px'}}>Tutors we recommend for you based on your course schedule. View the courses they tutor and thier ratings.</p>
                </ReactTooltip>
            </Paper>} 
        </div>
    );
    
}

function createData(name, email, phone, user,profile) {
    return { name, email, phone, user, profile};
};
function createData1(name, email, phone, user, ads) {
    return { name, email, phone, user, ads};
};

export default SuggestedTutorsDashboard;