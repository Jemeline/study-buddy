import React,{useState,useEffect} from 'react';
import {apiGetStudents,apiGetStudentProfiles} from '../../../utils/api';
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

function createData(name, email, phone, user,profile) {
  return { name, email, phone, user, profile};
};

function StudentUserList(){
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

    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  
  useEffect(async () => {
    try{
      setLoading(true);
      setError(false);
      const data = await apiGetStudents();
      const data1 = await apiGetStudentProfiles();
      if (data.data != null) {
        setUsers(data.data);
        setRows(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,data1.data.find(element => element._userId === e._id))));
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Student Type</TableCell>
              <TableCell align="left">Graduation Year</TableCell>
              <TableCell align="left">Program of Study</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? 
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user._id} hidden={(row.user._id ===JSON.parse(getUser())._id) || row.user.disabled} onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{(typeof(row.profile)==='undefined')?'':capitalizeFirst(row.profile.studentType)}</TableCell>
                <TableCell align="left">{(typeof(row.profile)==='undefined')?'':row.profile.graduationYear}</TableCell>
                <TableCell align="left">{(typeof(row.profile)==='undefined')? '':(row.profile.studentType === 'undergraduate')?row.profile.programOfStudy.major[0]:row.profile.programOfStudy.graduateProgram[0]}</TableCell>
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

export default StudentUserList;