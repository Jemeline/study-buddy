import React,{useState,useEffect} from 'react';
import {apiGetStudents,apiGetStudentProfiles,apiRemoveFavorite} from '../../../utils/api';
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
import {colorPalette} from '../../../utils/design';
import { makeStyles } from "@material-ui/core/styles";
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Favorites({setHideProfileTabs}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(JSON.parse(getUser()));
    const [profile, setProfile] = useState({});
    const [rowsFiltered, setRowsFiltered] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [hiddenTable,setHiddenTable] = useState(false);
    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [favorites,setFavorites]=useState([]);
    const classes = useStyles();


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
            setFavorites(data.data.filter(ele=>ele._id===JSON.parse(getUser())._id)[0].favorites);
            setRowsFiltered(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,data1.data.find(element => element._userId === e._id))));
            setLoading(false);
        } else {
            setError(true);
        }  
        } catch (err){
        setError(true);
        }  
    }, []);

  
  return <div style={{marginBottom:'5vh',height:'calc(100vh - 200px)'}}>
    <Paper hidden={hiddenTable} style={{overflow:'auto',width:'70vw',height:'65vh',marginTop:'5vh',}}>
    <TableContainer>
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Student Type</TableCell>
              <TableCell align="left">Graduation Year</TableCell>
              <TableCell align="left">Program of Study</TableCell>
              <TableCell align="left">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? 
            rowsFiltered.filter(row=>favorites.includes(row.user._id)).filter((row)=>!((row.user._id ===JSON.parse(getUser())._id) || row.user.disabled)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow className={classes.tableRow} hover key={row.user._id}>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);setHideProfileTabs(true);}} align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '5vw',width:"5vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '5vw',width:"5vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);setHideProfileTabs(true);}} align="left">{row.name}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);setHideProfileTabs(true);}} align="left">{row.email}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);setHideProfileTabs(true);}} align="left">{(typeof(row.profile)==='undefined')?'':capitalizeFirst(row.profile.studentType)}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);setHideProfileTabs(true);}} align="left">{(typeof(row.profile)==='undefined')?'':row.profile.graduationYear}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);setHideProfileTabs(true);}} align="left">{(typeof(row.profile)==='undefined')? '':(row.profile.studentType === 'undergraduate')?row.profile.programOfStudy.major:row.profile.programOfStudy.graduateProgram[0]}</TableCell>
                <TableCell align="left"><IconButton onClick={async () => {await handleRemoveFavorite(row.user,favorites,setFavorites)}}><DeleteIcon style={{ color: colorPalette.secondary }}/></IconButton></TableCell>
              </TableRow>
            )): <TableRow/>}
          </TableBody>
        </Table>
        </TableContainer>   
    </Paper>
    <Paper hidden={hiddenTable} style={{height:'55px',width:'70vw',marginBottom:'5vh'}}>
    <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
          component="div"
          count={rowsFiltered.length-rowsFiltered.filter((row)=>((row.user._id ===JSON.parse(getUser())._id) || row.user.disabled)).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    </Paper>
    <br/>
      <div hidden={hiddenProfile}>
        <ProfileRead user={user} profile={profile} setHiddenTable={setHiddenTable} setHiddenProfile={setHiddenProfile} setHideProfileTabs={setHideProfileTabs} hideProfileTabs={true}/>
      </div>
    </div>
}; 

async function handleRemoveFavorite(rowUser,favorites,setFavorites){
    try{
        const body = {"favorite":rowUser._id};
        const removeData = await apiRemoveFavorite(JSON.parse(getUser())._id,body);
        if (removeData){
          if (removeData.data.nModified === 1){
            setFavorites(favorites.filter(item => item !== rowUser._id ));
          }
        }
    } catch (err) {
      console.log(err);
    };
  };

const useStyles = makeStyles((theme) => ({
  tableRow: {
   '&&:hover': {
    },
  },
}));

function createData(name, email, phone, user,profile) {
  return { name, email, phone, user, profile};
};

export const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white'}),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
      ? null
      : isSelected
      ? colorPalette.secondary
      : isFocused
      ? colorPalette.secondary
      : null,
      color: isDisabled
      ? null
      : isSelected
      ? colorPalette.white
      : isFocused
      ? colorPalette.white
      : null,
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: colorPalette.secondary,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: colorPalette.white,
    fontSize:'1.2vw'
  }),
  placeholder: (styles, { data }) => ({
      ...styles,
      fontSize:'1.2vw'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: colorPalette.white,
    ':hover': {
      backgroundColor: colorPalette.secondaryA,
      color: colorPalette.white,
    },
  }),
};

export default Favorites;