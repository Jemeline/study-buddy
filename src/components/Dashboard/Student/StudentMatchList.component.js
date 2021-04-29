import React,{useState,useEffect} from 'react';
import {apiGetStudents,apiGetStudentProfile,apiGetStudentProfiles, apiGetCourseById} from '../../../utils/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {getUser,capitalizeFirst} from '../../../utils/common';
import ProfileRead from '../../Profile/View/ProfileRead.component.js';
import {getWeightedSum} from '../../Survey/MatchingAlgorithm';
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import SchoolIcon from '@material-ui/icons/School';
import HearingIcon from '@material-ui/icons/Hearing';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { colorPalette } from '../../../utils/design';
import Grid from '@material-ui/core/Grid';


function createData(name, email, phone, user,profile, sharedClasses, sharedLearningType, sum) {
  return { name, email, phone, user, profile, sharedClasses, sharedLearningType, sum };
};

function TopMatches(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState({});
    const [user, setUser] = useState(JSON.parse(getUser()));
    const [profile, setProfile] = useState({});
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [hiddenTable,setHiddenTable] = useState(false);
    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [userMatches, setUserMatches] = useState(getMatches());

    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

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
      if (students != null) {
        setUsers(students);
        setRows(await orderedStudents.filter((e)=>!(e.disabled || e._id===JSON.parse(getUser())._id)).map(student=> createData(
          (capitalizeFirst(student.first) + ' '+ capitalizeFirst(student.last)),
          student.email,
          student.phoneNumber,
          student,
          studentProfiles.find(element => element._userId === student._id),
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedClasses"], 
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedLearningType"],
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sum"]
          )));
        setLoading(false);
      } else {
        setError(true);
      }  
    } catch (err){
      setError(true);
    }  
  }, []);

  
  return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
    <Grid
          container
          direction="row"
          justify="center"
          spacing={1}
    >
    <Grid item  xs="auto" sm="auto" md="auto">
    <Paper hidden={hiddenTable} style={{overflow:'auto',width:'80vw',maxHeight:'70vh'}}>
    <TableContainer >
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="left">Percent Match</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Learning Type</TableCell>
              <TableCell align="left">Shared Courses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user._id} hidden={(row.user._id ===JSON.parse(getUser())._id) || row.user.disabled}>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.sum+'%'}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '5vw',width:"5vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '5vw',width:"5vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.name}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.email}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.sharedLearningType.length > 0 ? "You're both "  + row.sharedLearningType.join(", ") + " learners" : ""}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.sharedClasses.length > 0 ? "You're both taking " + row.sharedClasses.join(", ") : ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Paper>
      <Paper hidden={hiddenTable} style={{overflow:'auto',width:'80vw',height:'55px'}}>
        <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
      <div hidden={hiddenProfile}>
        <ProfileRead user={user} profile={profile} setHiddenTable={setHiddenTable} setHiddenProfile={setHiddenProfile}/>
      </div>
      </Grid>
    </Grid>
    </div>
}; 

export default TopMatches;