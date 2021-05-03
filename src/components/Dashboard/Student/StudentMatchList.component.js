import React,{useState,useEffect} from 'react';
import {apiGetStudents,apiGetStudentProfile,apiGetStudentProfiles} from '../../../utils/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {getUser,capitalizeFirst,getMatchColor} from '../../../utils/common';
import ProfileRead from '../../Profile/View/ProfileRead.component.js';
import {getWeightedSum} from '../../Survey/MatchingAlgorithm';
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import { colorPalette } from '../../../utils/design';
import Grid from '@material-ui/core/Grid';
import ReactLoading from 'react-loading';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


function createData(name, email, phone, user,profile, sharedClasses, sharedLearningType, percentMatch, sharedIdentifiers) {
  return { name, email, phone, user, profile, sharedClasses, sharedLearningType, percentMatch, sharedIdentifiers };
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
    const [userProfile,setUserProfile] = useState({});

    
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
      const userProfile = await studentProfiles.find(e=> user._id===e._userId);
      setUserProfile(userProfile);
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
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["percentMatch"],
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedIdentifiers"],
          )));
        setLoading(false);
      } else {
        setError(true);
      }  
    } catch (err){
      setLoading(false);
      setError(true);
    }  
  }, []);

  
  return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
    {loading ? <ReactLoading hidden={!loading} type={"cylon"} color={colorPalette.secondary} height={'10%'} width={'10%'} /> :
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
              <TableCell colspan="9" style={{ "text-align": "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>Explore My Matches</strong><InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="match-list"/></TableCell>
          </TableRow>
          </TableHead>
        <TableHead>
            <TableRow>
              <TableCell align="left">Percent Match</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Course Schedule</TableCell>
              <TableCell align="left">Majors</TableCell>
              <TableCell align="left">Graduation Year</TableCell>
              <TableCell align="left">Identifiers</TableCell>
              <TableCell align="left">Learning Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hidden={!error}><TableCell colSpan="9" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
            <TableRow hidden={rows.length>0 || error}><TableCell colSpan="9" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Could Not Find Any Users</strong></TableCell></TableRow>            
            {(!loading && !error) ? rows.filter(row=>row.percentMatch>0).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user._id} hidden={(row.user._id ===JSON.parse(getUser())._id) || row.user.disabled} style={{cursor:'pointer'}}>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left"><span style={{color:getMatchColor(row.percentMatch),fontSize:'20px'}}><strong>{row.percentMatch+'%'}</strong></span></TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '3vw',width:"3vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '3vw',width:"3vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.name}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.email}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.sharedClasses.length > 0 ? "You're both taking " + row.sharedClasses.join(", ") : ""}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{getMajor(row.profile,userProfile)}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{getGraduationYear(row.profile,userProfile)}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.sharedIdentifiers.length > 0 ? "You're both " + row.sharedIdentifiers.join(", ") + " students": ""}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.sharedLearningType.length > 0 ? "You're both "  + row.sharedLearningType.join(", ") + " learners" : ""}</TableCell>
              </TableRow>
            )): <TableRow/>}
          </TableBody>
        </Table>
        </TableContainer>
      </Paper>
      <Paper hidden={hiddenTable} style={{overflow:'auto',width:'80vw',height:'55px'}}>
        <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
          component="div"
          count={rows.length-rows.filter(row=>!row.percentMatch>0).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
      <div hidden={hiddenProfile}>
        <ProfileRead user={user} profile={profile} setHiddenTable={setHiddenTable} setHiddenProfile={setHiddenProfile}/>
      </div>
      <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="match-list" place="top" effect="float">
        <p style={{margin:0,width:'250px'}}>Click on any row to view more information about the user</p>
      </ReactTooltip>
      </Grid>
    </Grid>
  }
  </div>
}; 

function getArraysIntersection(a1,a2){
  return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
}

function getMajor(profile,userProfile){
  if (typeof(profile)==='undefined'){
    return ''
  } else if (profile.studentType === 'undergraduate'){
    if (getArraysIntersection(profile.programOfStudy.major,userProfile.programOfStudy.major).length>0){
      return "You are both in the "+getArraysIntersection(profile.programOfStudy.major,userProfile.programOfStudy.major)+' program';
    } else {
      return '';
    }
  } else {
    if (getArraysIntersection(profile.programOfStudy.graduateProgram,userProfile.programOfStudy.graduateProgram).length>0){
      return "You are both in the "+getArraysIntersection(profile.programOfStudy.graduateProgram,userProfile.programOfStudy.graduateProgram)+' program';
    } else {
      return '';
    }
  }
};

function getGraduationYear(profile,userProfile){
  if (typeof(profile)==='undefined'){
    return ''
  } else if (profile.graduationYear === userProfile.graduationYear){
    return 'You are both graduating in '+profile.graduationYear;
  } else {
    return '';
  }
};


export default TopMatches;