import React,{useState} from 'react';
import {colorPalette} from '../../../utils/design';
import {apiResubmitStudentProfile} from '../../../utils/api';
import { useHistory } from "react-router-dom";
import { InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import {Majors,Minors,GraduatePrograms} from '../../Survey/Student/utils/StudyPrograms';
import {LearningTypes} from '../../Survey/Student/utils/common';
import {Link} from 'react-router-dom';

 
function StudyPreferences({user,profile,error,loading,setProfile,hidden}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const selectMajors = (Majors.map((e)=> {return {label:e,value:e}}))
    const selectGraduatePOS = (GraduatePrograms.map((e)=> {return {label:e,value:e}}))
    const selectMinors = (Minors.map((e)=> {return {label:e,value:e}}));
    const selectLearningTypes = (LearningTypes.map((e)=> {return {label:e,value:e}}));
    const maxOptions = 3;
    const maxOptionsGraduate = 1;
    const [major, setMajor] = useState(profile.programOfStudy.major.map((e)=> {return {label:e,value:e}}));
    const [minor, setMinor] = useState(profile.programOfStudy.minor.map((e)=> {return {label:e,value:e}}));
    const [learningType, setLearningType] = useState((profile.learningType.includes('prefer not to answer')) ?  []: profile.learningType.map((e)=> {return {label:e,value:e}}));
    const [graduatePOS, setGraduatePOS] = useState(profile.programOfStudy.graduateProgram.map((e)=> {return {label:e,value:e}}));
    const [graduationYear, setGraduationYear] = useState(profile.graduationYear);
    const [studentType, setStudentType] = useState(profile.studentType);
    const now = new Date().getFullYear();
    const years = [...Array(8).keys()].map(i => i + now);

    const handleChangeMajor = (e) => {
        setMajor(e);
    };
    const handleChangeMinor = (e) => {
        setMinor(e);
    };
    const handleChangeGraduatePOS = (e) => {
        setGraduatePOS(e);
    };
    const handleChangeLearningTypes = (e) => {
        setLearningType(e);
    };

    const revertChanges = () => {
        setGraduationYear(profile.graduationYear);
        setStudentType(profile.studentType);
        setMajor(profile.programOfStudy.major.map((e)=> {return {label:e,value:e}}));
        setMinor(profile.programOfStudy.minor.map((e)=> {return {label:e,value:e}}));
        setGraduatePOS(profile.programOfStudy.graduateProgram.map((e)=> {return {label:e,value:e}}));
        setLearningType((profile.learningType.includes('prefer not to answer')) ?  []: profile.learningType.map((e)=> {return {label:e,value:e}}));
    };
    
    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Study Preferences</h5>
      <IconButton hidden={hidden} style={{float:'right'}} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem hidden={update} onClick={() => {handleClose();setUpdate(true);}}>Update Details</MenuItem>
        <MenuItem hidden={!update || !years.includes(parseInt(graduationYear)) || (major.length===0  && studentType=== 'undergraduate') || (graduatePOS.length===0  && studentType=== 'graduate')} 
            onClick={async () => {handleClose();await handleUpdate(createStudentProfilePayload(graduationYear,major,minor,graduatePOS,studentType,learningType,user,profile.courseSchedule),revertChanges,setProfile,profile,user,studentType,graduationYear,graduatePOS,major,minor,learningType);setUpdate(false);}}>Save Details</MenuItem>
        <MenuItem hidden={!update} onClick={async () => {handleClose();revertChanges();setUpdate(false);}}>Cancel Update</MenuItem>
      </Menu>
      {loading ? <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading hidden={!loading} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                </div>
      : error ? <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h4>Oops... something went wrong.</h4>
                    <Link to="/student-survey">Please Retake the Survey</Link>

                </div>
      :<div style={{width:'65vw',display:'flex',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw',width:'30vw'}}>
        <br/>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Graduation Year</InputGroupText>
            </InputGroupAddon>
            <Input style={{backgroundColor:'white',fontSize:'1.2vw'}} value={graduationYear}
                onChange={(e) => {if (update){setGraduationYear(e.target.value)};}}
                valid={update && years.includes(parseInt(graduationYear))}
                invalid={update && !years.includes(parseInt(graduationYear))}
                disabled={!update}
            />
          </InputGroup>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Student Type</InputGroupText>
            </InputGroupAddon>
                <Input type="select" value={studentType} onChange={(e) => {setStudentType(e.target.value)}} style={{backgroundColor:'white',fontSize:'1.2vw'}} disabled={!update}>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                </Input>
            </InputGroup>
        </div>
        <div style={{margin:'1vw',width:'50vw'}}>
            <div hidden={studentType === 'graduate'}>
            <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Majors</p>
            <Select
                placeholder={"My Major(s) (Required)"}
                isMulti
                options={(major.length + minor.length) === maxOptions ? [] : selectMajors}
                onChange={(e)=> handleChangeMajor(e)}
                noOptionsMessage={()=>'Max 3 Selections'}
                styles={colourStyles}
                value={major}
                menuPlacement="auto"
                isDisabled={!update}
                hidden={profile.studentType === 'graduate'}
                style={{marginBottom:'1vw'}}
            />
            </div>
            <div style={{paddingBottom:'1vw'}} hidden={studentType === 'graduate'}>
            <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Minors</p>
            <Select
                placeholder={"My Minor(s)"}
                isMulti
                options={(major.length + minor.length) === maxOptions ? [] : selectMinors}
                onChange={(e)=> handleChangeMinor(e)}
                noOptionsMessage={()=>'Max 3 Selections'}
                styles={colourStyles}
                value={minor}
                menuPlacement="auto"
                isDisabled={!update}     
            />
            </div>
            <div style={{paddingBottom:'1vw'}} hidden={studentType === 'undergraduate'}>
            <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Program of Study</p>
            <Select
                placeholder={"Program of Study"}
                isMulti
                options={(graduatePOS.length) === maxOptionsGraduate ? [] : selectGraduatePOS}
                onChange={(e)=> handleChangeGraduatePOS(e)}
                noOptionsMessage={()=>'Max 1 Selection'}
                styles={colourStyles}
                value={graduatePOS}
                menuPlacement="auto"
                isDisabled={!update}
            />
            </div>
            <div style={{paddingBottom:'1vw'}}>
                <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Learning Type</p>
                <Select
                    placeholder={"Learning Type(s)"}
                    isMulti
                    options={selectLearningTypes}
                    onChange={(e)=> handleChangeLearningTypes(e)}
                    styles={colourStyles}
                    value={learningType}
                    menuPlacement="auto"
                    isDisabled={!update}
                />
            </div>
        </div>
      </div>}
    </div>
};

async function handleUpdate(payload,revertChanges,setProfile,profile,user,studentType,graduationYear,graduatePOS,major,minor,learningType){
    try {
        const data = await apiResubmitStudentProfile(payload);
        const newProfile = profile;
        if (data){
            if (studentType === 'graduate') {
                newProfile.graduationYear = graduationYear;
                newProfile.studentType=studentType;
                newProfile.programOfStudy.graduateProgram = graduatePOS.map((ele)=>ele.value);
                newProfile.programOfStudy.major = [];
                newProfile.programOfStudy.minor = [];
                newProfile.learningType = (learningType.length !== 0)?learningType.map((ele)=>ele.value):['prefer not to answer'];
                
            } else {
                newProfile.graduationYear = graduationYear;
                newProfile.studentType=studentType;
                newProfile.programOfStudy.major=major.map((ele)=>ele.value);
                newProfile.programOfStudy.minor=minor.map((ele)=>ele.value);
                newProfile.learningType = (learningType.length !== 0)?learningType.map((ele)=>ele.value):['prefer not to answer'];
                newProfile.programOfStudy.graduateProgram = [];
            }
            setProfile(newProfile);
        } else {
            revertChanges();
        }
    } catch (error){
        console.log(error);
    };
};
function createStudentProfilePayload(graduationYear,major,minor,graduatePOS,studentType,learningType,user,courseSchedule){
    if (studentType === 'graduate') {
        const graduateObj = {
            _userId:user._id,
            graduationYear:graduationYear,
            studentType:studentType,
            programOfStudy:{graduateProgram:graduatePOS.map((ele)=>ele.value),major:[],minor:[]},
            courseSchedule:courseSchedule,
            learningType:(learningType.length !== 0)?learningType.map((ele)=>ele.value):['prefer not to answer'],
        }
        return graduateObj;
    } else {
        const undergraduateObj = {
            _userId:user._id,
            graduationYear:graduationYear,
            studentType:studentType,
            programOfStudy:{major:major.map((ele)=>ele.value),minor:minor.map((ele)=>ele.value),graduateProgram:[]},
            courseSchedule:courseSchedule,
            learningType:(learningType.length !== 0)?learningType.map((ele)=>ele.value):['prefer not to answer'],
        }
        return undergraduateObj;
    }
};

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white',width:'35vw'}),
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
export default StudyPreferences;