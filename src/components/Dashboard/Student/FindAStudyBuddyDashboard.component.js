import React, { useState,useEffect } from "react";
import { getUser, capitalizeFirst } from "../../../utils/common";
import {apiGetStudents,apiGetStudentProfiles} from "../../../utils/api";
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

function FindAStudyBuddyDashboard() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rows, setRows] = useState([]);

    
    useEffect(async () => {
        try{
            setLoading(true);
            setError(false);
            const data = await apiGetStudents();
            const data1 = await apiGetStudentProfiles();
            setRows(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,data1.data.find(element => element._userId === e._id))));
            setLoading(false);
        } catch (err){
          setError(true);
          setLoading(false);
        }  
    }, []);

    return (
        <div data-testid='FindBuddy-Dashboard'>
            {loading ? <div style={{backgroundColor:'white',zIndex:-1,height:'450px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
            <Paper style={{overflow:'auto',width:"100%",height:'450px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer'}} onClick={()=>history.push('/find-students')}>
                <TableContainer style={{height:'450px'}}>
                    <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan="4" style={{ textAlign: "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>Browse All Users</strong></TableCell>
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
                        <TableRow hidden={!error}><TableCell colSpan="5" style={{ textAlign: "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
                        <TableRow hidden={rows.length>0 || error}><TableCell colSpan="5" style={{ textAlign: "center",fontSize:'15px',color:'darkgray'}}><strong>Could Not Find Any Users</strong></TableCell></TableRow>
                        {!loading ? 
                        rows.filter((row)=>!((row.user._id ===JSON.parse(getUser())._id) || row.user.disabled)).map((row) => (
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
            </Paper>} 
        </div>
    );
}

function createData(name, email, phone, user,profile) {
    return { name, email, phone, user, profile};
};

export default FindAStudyBuddyDashboard;