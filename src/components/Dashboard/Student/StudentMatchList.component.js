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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SchoolIcon from '@material-ui/icons/School';
import HearingIcon from '@material-ui/icons/Hearing';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { colorPalette } from '../../../utils/design';
import ReactLoading from 'react-loading';


function createData(name, email, phone, user,profile, sharedClasses, sharedLearningType) {
  return { name, email, phone, user, profile, sharedClasses, sharedLearningType };
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
      // const orderedProfiles = awaitedUserMatches.map(match => studentProfiles.find(profile => profile._id === match[0]));
      const orderedStudents = awaitedUserMatches.map(match => students.find(student => student._id === studentProfiles.find(profile => profile._id === match["id"])._userId));
      if (students != null) {
        setUsers(students);
        setRows(await orderedStudents.map(student=> createData(
          (capitalizeFirst(student.first) + ' '+ capitalizeFirst(student.last)),
          student.email,
          student.phoneNumber,
          student,
          studentProfiles.find(element => element._userId === student._id),
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedClasses"], 
          awaitedUserMatches.find(match => match["id"] === studentProfiles.find(profile => profile._userId === student._id)._id)["sharedLearningType"]
          )));
        setLoading(false);
      } else {
        setError(true);
      }  
    } catch (err){
      setError(true);
    }  
  }, []);

  
  return <div>
    <Paper hidden={hiddenTable} style={{overflow:'auto',width:'80vw',maxHeight:'70vh'}}>
    <TableContainer >
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"><h5><strong>Top Matches For You</strong></h5></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"><HearingIcon /><VisibilityIcon /><FingerprintIcon /></TableCell>
              <TableCell align="center"><SchoolIcon /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? 
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user._id} hidden={(row.user._id ===JSON.parse(getUser())._id) || row.user.disabled} onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}}>
                <TableCell align="center"><AccountCircleIcon /></TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"><p style={{color: colorPalette.darkGray}}>{row.sharedLearningType.length > 0 ? "You're both "  + row.sharedLearningType.join(", ") + " learners" : ""}</p></TableCell>
                <TableCell align="center"><p style={{color: colorPalette.darkGray}}>{row.sharedClasses.length > 0 ? "You're both taking " + row.sharedClasses.join(", ") : ""}</p></TableCell>
              </TableRow>
            )): <TableRow>
                    <ReactLoading type={"cylon"} color={colorPalette.secondary} height={'100%'} width={'100%'}/>
                </TableRow>}
          </TableBody>
        </Table>
        </TableContainer>
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
    </div>
}; 

export default TopMatches;