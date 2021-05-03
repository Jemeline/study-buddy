import React, { useState,useEffect } from "react";
import {colorPalette} from "../../../utils/design";
import Paper from '@material-ui/core/Paper';
import ReactLoading from "react-loading";
import {apiGetStudents,apiGetStudentProfile,apiGetStudentProfiles} from '../../../utils/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getUser,capitalizeFirst, getMatchColor} from '../../../utils/common';
import {getWeightedSum} from '../../Survey/MatchingAlgorithm';
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


function SuggestedMatchesDashboard() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [userMatches, setUserMatches] = useState(getMatches());


    async function getMatches() {
      const user = JSON.parse(getUser());
      const profile = (await apiGetStudentProfile(user._id)).data;
      const matches = await getWeightedSum(profile);
      return matches;
    }

  
    useEffect(async () => {
        try{
            setLoading(true);
            setError(false);  
            const students = (await apiGetStudents()).data;
            const studentProfiles = (await apiGetStudentProfiles()).data;
            const awaitedUserMatches = await userMatches;
            const orderedStudents = awaitedUserMatches.map(match => students.find(student => student._id === studentProfiles.find(profile => profile._id === match["id"])._userId));
            setRows(await orderedStudents.filter((e)=>!(e.disabled || e._id===JSON.parse(getUser())._id)).map(student=> createData(
                (capitalizeFirst(student.first) + ' '+ capitalizeFirst(student.last)),
                student.email,
                student.phoneNumber,
                student,
                studentProfiles.find(element => element._userId === student._id),
                awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedClasses"], 
                awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedLearningType"],
                awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["percentMatch"]
            )));
            setLoading(false);
        } catch (err){
            setError(true);
            setLoading(false);
        }  
    }, []);

    return (
        <div>
            {loading ? <div style={{backgroundColor:'white',zIndex:-1,height:'450px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
            <Paper style={{overflow:'auto',width:"100%",height:'450px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer'}} onClick={()=>history.push('/match')}>
                <TableContainer style={{height:'450px'}}>
                    <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell colspan="7" style={{ "text-align": "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>My Matches</strong><InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="match-dash"/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left" >Match</TableCell>
                        <TableCell align="left" ></TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow hidden={!error}><TableCell colSpan="7" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
                    <TableRow hidden={rows.length>0 || error}><TableCell colSpan="7" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>No Matches Found</strong></TableCell></TableRow>
                    {(!loading && !error)? 
                        rows.filter(row=>row.percentMatch>0).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow hover key={row.user._id} hidden={(row.user._id ===JSON.parse(getUser())._id) || row.user.disabled}>
                            <TableCell align="left"><span style={{color:getMatchColor(row.percentMatch),fontSize:'15px'}}><strong>{row.percentMatch+'%'}</strong></span></TableCell>
                            <TableCell align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '5vw',width:"5vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '5vw',width:"5vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                        </TableRow>
                    )): <TableRow/>}
                    </TableBody>
                    </Table>
                </TableContainer>
                <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="match-dash" place="top" effect="float">
                    <p style={{margin:0,width:'250px'}}>The Study Buddies we have matched you with, ranked highest to lowest in terms of compatibility.</p>
                </ReactTooltip>  
            </Paper>} 
        </div>
    );
}

function createData(name, email, phone, user,profile, sharedClasses, sharedLearningType, percentMatch) {
    return { name, email, phone, user, profile, sharedClasses, sharedLearningType, percentMatch };
};

export default SuggestedMatchesDashboard;