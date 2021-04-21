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

function createData(name, email, phone, user,profile, sharedClasses) {
  return { name, email, phone, user, profile, sharedClasses };
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
    const [userSums, setUserSums] = useState(getSums());

    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    async function getSums() {
      const user = JSON.parse(getUser());
      const profile = (await apiGetStudentProfile(user._id)).data;
      const sums = await getWeightedSum(profile);
      return sums;
    }

  
  useEffect(async () => {
    try{
      setLoading(true);
      setError(false);  
      const students = (await apiGetStudents()).data;
      const studentProfiles = (await apiGetStudentProfiles()).data;
      const awaitedUserSums = await userSums;
      console.log(awaitedUserSums.map(user => user["sharedClasses"]));
      const orderedProfiles = awaitedUserSums.map(userSum => studentProfiles.find(profile => profile._id === userSum[0]));
      const orderedStudents = awaitedUserSums.map(u => students.find(student => student._id === studentProfiles.find(profile => profile._userId === u[0])._userId));
      if (students != null) {
        setUsers(students);
        setRows(await orderedStudents.map((student, i)=> createData((capitalizeFirst(student.first) + ' '+ capitalizeFirst(student.last)),student.email,student.phoneNumber,student,studentProfiles.find(element => element._userId === student._id),awaitedUserSums[i]["sharedClasses"])));
        console.log(rows.map(row => row.sharedClasses));
        setLoading(false);
      } else {
        setError(true);
      }  
    } catch (err){
      setError(true);
    }  
  }, []);

  
  return <div>
    <Paper hidden={hiddenTable} style={{overflow:'auto',width:'70vw',maxHeight:'70vh'}}>
    <TableContainer >
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="center">Top Matches For You</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? 
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user._id} hidden={(row.user._id ===JSON.parse(getUser())._id) || row.user.disabled} onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">You're both taking </TableCell>
              </TableRow>
            )): <TableRow/>}
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