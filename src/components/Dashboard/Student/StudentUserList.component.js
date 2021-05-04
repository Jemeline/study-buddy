import React,{useState,useEffect} from 'react';
import {apiGetStudents,apiGetStudentProfiles,apiAddFavorite,apiRemoveFavorite} from '../../../utils/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {getUser,capitalizeFirst,getIconIdentifiers,getIconLearningType} from '../../../utils/common';
import ProfileRead from '../../Profile/View/ProfileRead.component.js';
import {colorPalette} from '../../../utils/design';
import Select from 'react-select';
import {Majors,Minors,GraduatePrograms} from '../../Survey/Student/utils/StudyPrograms';
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Identifiers} from '../../Survey/Student/utils/common';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import PanToolIcon from '@material-ui/icons/PanTool';
import FunctionsIcon from '@material-ui/icons/Functions';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import RepeatOneOutlinedIcon from '@material-ui/icons/RepeatOneOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import TransformOutlinedIcon from '@material-ui/icons/TransformOutlined';
import PoolOutlinedIcon from '@material-ui/icons/PoolOutlined';
import {Button} from 'reactstrap';


function StudentUserList(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState({});
    const [user, setUser] = useState(JSON.parse(getUser()));
    const [profile, setProfile] = useState({});
    const [rows, setRows] = useState([]);
    const [rowsFiltered, setRowsFiltered] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [hiddenTable,setHiddenTable] = useState(false);
    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [studentType, setStudentType] = useState([]);
    const [graduationYear, setGraduationYear] = useState([]);
    const [identifiers, setIdentifiers] = useState([]);
    const [programOfStudy, setProgramOfStudy] = useState([]);
    const [optionsStudentNames, setOptionsStudentNames] = useState([]);
    const [studentName, setStudentName] = useState([]);
    const [favorites,setFavorites]=useState([]);
    const [hideProfileTabs, setHideProfileTabs] = useState(false);


    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleChangeStudentType = (e) => {
      setStudentType(e);
      setStudentName([]);
      if (graduationYear.length===0 && programOfStudy.length===0 && identifiers.length===0 && e.length ===0){
        setRowsFiltered(rows);
      } else {
        setRowsFiltered(rows.filter((row)=>
        (
          (typeof(row.profile)!=='undefined') &&
          ((graduationYear.length>0)?graduationYear.map((ele)=>ele.value).includes(row.profile.graduationYear):true)&&
          ((e.length>0)?row.profile.studentType===e[0].value:true) &&
          ((programOfStudy.length>0)?programOfStudy.map((ele)=>ele.value).some(val => row.profile.programOfStudy.major.indexOf(val) !== -1|| row.profile.programOfStudy.graduateProgram.indexOf(val) !== -1):true)&&
          ((identifiers.length>0)?identifiers.map((ele)=>ele.value).some(val => row.profile.identifiers.indexOf(val) !== -1):true)
        )
        ));
      }
    };

    const handleChangeGraduationYear = (e) => {
      setGraduationYear(e);
      setStudentName([]);
      if (studentType.length===0 && programOfStudy.length===0 && identifiers.length===0 && e.length ===0){
        setRowsFiltered(rows);
      } else {
        setRowsFiltered(rows.filter((row)=>
        (
          (typeof(row.profile)!=='undefined') &&
          ((e.length>0)?e.map((ele)=>ele.value).includes(row.profile.graduationYear):true)&&
          ((studentType.length>0)?row.profile.studentType===studentType[0].value:true) &&
          ((programOfStudy.length>0)?programOfStudy.map((ele)=>ele.value).some(val => row.profile.programOfStudy.major.indexOf(val) !== -1|| row.profile.programOfStudy.graduateProgram.indexOf(val) !== -1):true)&&
          ((identifiers.length>0)?identifiers.map((ele)=>ele.value).some(val => row.profile.identifiers.indexOf(val) !== -1):true)
        )
        ));
      }
    };

    const handleChangePOS = (e) => {
      setProgramOfStudy(e);
      setStudentName([]);
      if (studentType.length===0 && graduationYear.length===0 && identifiers.length===0 && e.length===0){
        setRowsFiltered(rows);
      } else {
        setRowsFiltered(rows.filter((row)=>
        (
          (typeof(row.profile)!=='undefined') &&
          ((graduationYear.length>0)?graduationYear.map((ele)=>ele.value).includes(row.profile.graduationYear):true)&&
          ((studentType.length>0)?row.profile.studentType===studentType[0].value:true) &&((programOfStudy.length>0)?programOfStudy.map((ele)=>ele.value).some(val => row.profile.programOfStudy.major.indexOf(val) !== -1|| row.profile.programOfStudy.graduateProgram.indexOf(val) !== -1):true)&&
          ((identifiers.length>0)?identifiers.map((ele)=>ele.value).some(val => row.profile.identifiers.indexOf(val) !== -1):true)&&
          ((e.length>0)?e.map((ele)=>ele.value).some(val => row.profile.programOfStudy.major.indexOf(val) !== -1):true)
        ) 
        ));
      }
    };
    const handleChangeIdentifiers = (e) => {
      setIdentifiers(e);
      setStudentName([]);
      if (studentType.length===0 && graduationYear.length===0 && programOfStudy.length===0 && e.length===0){
        setRowsFiltered(rows);
      } else {
        setRowsFiltered(rows.filter((row)=>{
          return (
            (typeof(row.profile)!=='undefined') &&
            ((graduationYear.length>0)?graduationYear.map((ele)=>ele.value).includes(row.profile.graduationYear):true)&&
            ((studentType.length>0)?row.profile.studentType===studentType[0].value:true) &&
            ((programOfStudy.length>0)?programOfStudy.map((ele)=>ele.value).some(val => row.profile.programOfStudy.major.indexOf(val) !== -1|| row.profile.programOfStudy.graduateProgram.indexOf(val) !== -1):true)&&
            ((e.length>0)?e.map((ele)=>ele.value).some(val => row.profile.identifiers.indexOf(val) !== -1):true)
            ) 
        }
        ));
      }
    };

    const handleChangeStudentName = (e) => {
      setStudentName(e);
      setStudentType([]);
      setGraduationYear([]);
      setProgramOfStudy([]);
      setIdentifiers([]);
      if (e.length===0){
        setRowsFiltered(rows);
      } else {
        setRowsFiltered(rows.filter((row)=>
          ((e.length>0)?e.map((ele)=>ele.value).includes(capitalizeFirst(row.user.first)+' '+capitalizeFirst(row.user.last)):true)
        ));
      }
    };

    
  useEffect(async () => {
    try{
        setLoading(true);
        setError(false);
        const data = await apiGetStudents();
        const data1 = await apiGetStudentProfiles();
        setUsers(data.data);
        setFavorites(data.data.filter(ele=>ele._id===JSON.parse(getUser())._id)[0].favorites);
        setOptionsStudentNames([... new Set(await data.data.filter((e)=>!(e.disabled || e._id===JSON.parse(getUser())._id)).map(e => capitalizeFirst(e.first)+" "+capitalizeFirst(e.last)))].map((e)=> {return {label:e,value:e}}));
        setRows(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,data1.data.find(element => element._userId === e._id))));
        setRowsFiltered(await data.data.map((e)=> createData((capitalizeFirst(e.first) + ' '+ capitalizeFirst(e.last)),e.email,e.phoneNumber,e,data1.data.find(element => element._userId === e._id))));
        setLoading(false);
    } catch (err){
      setError(true);
      setLoading(false);
    }  
  }, []);

  function getFavorites(user){
    if (favorites.includes(user._id)){
      return colorPalette.secondary;
    } else {
      return 'lightgray';
    }
  };

  
  return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'space-evenly',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
    <div hidden={hiddenTable} style={{width:'20vw',height:'calc(70vh + 55px)'}}>
      <p style={{margin:0,color:colorPalette.secondary}}>Search By Attribute<InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="user-list"/></p>
      <hr style={{borderTop: `3px solid ${colorPalette.secondary}`,marginTop:0}}/>
      <Select
        isMulti
        options={(studentType.length===1) ? [] : optionsStudentType}
        placeholder={"Student Type"}
        onChange={(e)=> handleChangeStudentType(e)}
        value={studentType}
        menuPlacement="auto"
        noOptionsMessage={()=>'Max 1 Selection'}
        styles={colourStyles}
      />
      <br/>
      <Select
        isMulti
        options={optionsGraduationYear}
        placeholder={"Graduation Year"}
        onChange={(e)=> handleChangeGraduationYear(e)}
        value={graduationYear}
        menuPlacement="auto"
        styles={colourStyles}
      />
      <br/>
      <Select
        isMulti
        options={(studentType.length===0)?optionsMajors.concat(optionsGraduatePOS):(studentType[0].value==='undergraduate')?optionsMajors:optionsGraduatePOS}
        placeholder={"Program of Study"}
        onChange={(e)=> handleChangePOS(e)}
        value={programOfStudy}
        menuPlacement="auto"
        styles={colourStyles}
      />
      <br/>
      <Select
        isMulti
        options={optionsIdentifiers}
        placeholder={"Identifiers"}
        onChange={(e)=> handleChangeIdentifiers(e)}
        value={identifiers}
        menuPlacement="auto"
        styles={colourStyles}
      />
      <br/>
      <p style={{margin:0,color:colorPalette.secondary}}>Search By Name</p>
      <hr style={{borderTop: `3px solid ${colorPalette.secondary}`,marginTop:0}}/>
      <Select
        isMulti
        options={optionsStudentNames}
        placeholder={"Student Name"}
        onChange={(e)=> handleChangeStudentName(e)}
        value={studentName}
        menuPlacement="auto"
        styles={colourStyles}
      />
      <br/>
      <hr style={{borderTop: `3px solid ${colorPalette.secondary}`,marginTop:0}}/>
      <Button style={{backgroundColor:colorPalette.secondary}} onClick={()=>{
        setStudentName([]);
        setStudentType([]);
        setGraduationYear([]);
        setProgramOfStudy([]);
        setIdentifiers([]);
        setRowsFiltered(rows);
      }}>Clear Fields</Button>
    </div>
    <div style={{width:"75vw"}}>
    <Paper hidden={hiddenTable} style={{overflow:'auto',width:'75vw',maxHeight:'70vh',height:'70vh'}}>
    <TableContainer>
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
                <TableCell colspan="9" style={{ "text-align": "left",fontSize:'20px',fontFamily: 'Garamond, serif' }}><strong>Find A Study Buddy</strong><InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="click-row"/></TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Student Type</TableCell>
              <TableCell align="left">Graduation Year</TableCell>
              <TableCell align="left">Program of Study</TableCell>
              <TableCell align="left">Minors</TableCell>
              <TableCell align="left">Identifiers<InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="identifier"/></TableCell>
              <TableCell align="left">Learning Style<InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="learning-type"/></TableCell>
              <TableCell align="left">Add To Favorites<InfoOutlinedIcon style={{height:'20px'}} data-tip data-for="favorite"/></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hidden={!error}><TableCell colSpan="9" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>Oops... Something went wrong</strong></TableCell></TableRow>
            <TableRow hidden={rowsFiltered.length>0 || error}><TableCell colSpan="9" style={{ "text-align": "center",fontSize:'15px',color:'darkgray'}}><strong>No Users Found</strong></TableCell></TableRow>
            {(!loading && !error)? 
            rowsFiltered.filter((row)=>!((row.user._id ===JSON.parse(getUser())._id) || row.user.disabled)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.user._id} style={{cursor:'pointer'}}>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(!row.user.avatar)?<img src={avatarUnknown} style={{height: '3vw',width:"3vw",borderRadius:'50%'}}/>:<div style={{borderRadius:'50%',height: '3vw',width:"3vw",backgroundImage:`url(${row.user.avatar})`,backgroundSize:'cover',backgroundPosition:'center'}}/>}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{row.name}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(typeof(row.profile)==='undefined')?'':capitalizeFirst(row.profile.studentType)}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(typeof(row.profile)==='undefined')?'':row.profile.graduationYear}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(typeof(row.profile)==='undefined')? '':(row.profile.studentType === 'undergraduate')?row.profile.programOfStudy.major:row.profile.programOfStudy.graduateProgram[0]}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(typeof(row.profile)==='undefined')? '':(row.profile.studentType === 'undergraduate')?row.profile.programOfStudy.minor:''}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(typeof(row.profile)==='undefined')?'':row.profile.identifiers.map(e=>getIconIdentifiers(e))}</TableCell>
                <TableCell onClick={()=> {setUser(row.user);setProfile(row.profile);setHiddenTable(true);setHiddenProfile(false);}} align="left">{(typeof(row.profile)==='undefined')?'':row.profile.learningType.map(e=>getIconLearningType(e))}</TableCell>
                <TableCell align="left"><IconButton onClick={async () => {await handleFavorite(row.user,favorites,setFavorites);}}><FavoriteIcon style={{color:getFavorites(row.user)}}/></IconButton></TableCell>
              </TableRow>
            )): <TableRow/>}
          </TableBody>
        </Table>
        </TableContainer>  
        <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="learning-type" place="left" effect="float">
          <p style={{margin:'0px'}}><VisibilityIcon/> Visual</p>
          <p style={{margin:'0px'}}><PersonIcon/> Solitary</p>
          <p style={{margin:'0px'}}><GroupIcon/> Social</p>
          <p style={{margin:'0px'}}><RecordVoiceOverIcon/> Verbal</p>
          <p style={{margin:'0px'}}><HearingIcon/> Auditory/Musical</p>
          <p style={{margin:'0px'}}><PanToolIcon/> Physical/Kinaesthetic</p>
          <p style={{margin:'0px'}}><FunctionsIcon/> Logical/Mathematical</p>
        </ReactTooltip> 
        <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="identifier" place="left" effect="float">
          <p style={{margin:'0px'}}><RepeatOneOutlinedIcon/> First Generation</p>
          <p style={{margin:'0px'}}><MapOutlinedIcon/> Out-of-State</p>
          <p style={{margin:'0px'}}><LanguageOutlinedIcon/> International</p>
          <p style={{margin:'0px'}}><SchoolOutlinedIcon/> First Year</p>
          <p style={{margin:'0px'}}><FunctionsIcon/> Greek Life</p>
          <p style={{margin:'0px'}}><PoolOutlinedIcon/> Athlete</p>
          <p style={{margin:'0px'}}><TransformOutlinedIcon/> Transfer</p>
        </ReactTooltip>
    </Paper>
    <Paper hidden={hiddenTable} style={{overflow:'auto',width:'75vw',height:'55px'}}>
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
      <div hidden={hiddenProfile}>
        <ProfileRead user={user} profile={profile} setHiddenTable={setHiddenTable} setHiddenProfile={setHiddenProfile} setHideProfileTabs={setHideProfileTabs} hideProfileTabs={false}/>
      </div>
      <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="user-list" place="bottom" effect="float">
          <p style={{margin:0,width:'250px'}}>Whether you want to find your friends or find your perfect studying companion, this tool gives you the power to filter our users based on your own specifications.</p>
      </ReactTooltip> 
      <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="favorite" place="bottom" effect="float">
          <p style={{margin:0,width:'250px'}}>Found the perfect Study Buddy? Check the heart to add them to your favorites. They wil be stored in the profile tab for safe keeping!</p>
      </ReactTooltip> 
      <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="click-row" place="bottom" effect="float">
        <p style={{margin:0,width:'250px'}}>Click on any row to view more information about the user</p>
      </ReactTooltip>
    </div>
    </div>
}; 

async function handleFavorite(rowUser,favorites,setFavorites){
  try{
    if (favorites.includes(rowUser._id)){
      const body = {"favorite":rowUser._id};
      const removeData = await apiRemoveFavorite(JSON.parse(getUser())._id,body);
      if (removeData){
        if (removeData.data.nModified === 1){
          setFavorites(favorites.filter(item => item !== rowUser._id ));
        }
      }
    } else {
      const body = {"favorite":rowUser._id};
      const addData = await apiAddFavorite(JSON.parse(getUser())._id,body);
      if (addData){
        if (addData.data.nModified === 1){
          setFavorites(prevArray => [...prevArray, rowUser._id]);
        }
      }
    }
  } catch (err) {
    console.log(err);
  };
};



const optionsStudentType = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' } 
];

const optionsMajors = Majors.map((e)=> {return {label:e,value:e}});
const optionsGraduatePOS = GraduatePrograms.map((e)=> {return {label:e,value:e}});
const optionsIdentifiers = Identifiers.map((e)=> {return {label:e,value:e}});
const years = [...Array(9).keys()].map(i => i + new Date().getFullYear());
const optionsGraduationYear = years.map((e)=> {return {label:e,value:e}});

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

export default StudentUserList;