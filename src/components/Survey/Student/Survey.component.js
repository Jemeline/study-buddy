import React, {useState,useEffect} from 'react';
import {getUser} from '../../../utils/common';
import SurveyGraduationYear from './questions/SurveyGraduationYear.component';
import SurveyProgramOfStudy from './questions/SurveyProgramOfStudy.component';
import SurveyStudentType from './questions/SurveyStudentType.component';
import SurveyLearningType from './questions/SurveyLearningType.component';
import background from '../survey-background.jpg';
import SurveyCourseSchedule from './questions/SurveyCourseSchedule.component';
import CourseSearchImproved from '../../CourseSchedule/CourseSearchImproved.component';
import SurveyNavigation from './SurveyNavigation.component';
import SurveyResubmit from './SurveyResubmit.component';
import SurveyComplete from './SurveyComplete.component';
import {getGraduationYear,getStudentType,getMajor,getMinor,getCurrPage,getCourseSchedule,getLearningType,getGraduatePOS} from './utils/common';
import { useHistory } from "react-router-dom";
import {apiGetStudents,apiGetStudentProfiles,apiGetStudentProfile,apiGetCoursesById} from "../../../utils/api";

function Survey(){
    const user = JSON.parse(getUser());
    const [currPage, setCurrPage] = useState((getCurrPage() !== null)? parseInt(getCurrPage()) : 0);
    const pageStart = 0;
    const pageEnd = 5;
    const [graduationYear, setGraduationYear] = useState(new Date().getFullYear());
    const [minor, setMinor] = useState([]);
    const [major, setMajor] = useState([]);
    const [graduatePOS, setGraduatePOS] = useState([]);
    const [studentType, setStudentType] = useState('');
    const [courseSchedule, setCourseSchedule] = useState([]);
    const [learningType, setLearningType] = useState([]);
    const profilePayload = () => createStudentProfilePayload(graduationYear,major,minor,graduatePOS,studentType,courseSchedule,learningType,user);
    const history = useHistory();
    
    useEffect(async () => {
        try{
            if(user.isSurveyed){
                const profiles = await apiGetStudentProfiles();
                const courseSchedule = await profiles.data.filter(e=>e._userId === user._id)[0].courseSchedule;
                const studentType = await profiles.data.filter(e=>e._userId === user._id)[0].studentType;
                const graduationYear = await profiles.data.filter(e=>e._userId === user._id)[0].graduationYear;
                const graduatePOS = await profiles.data.filter(e=>e._userId === user._id)[0].programOfStudy.graduateProgram.map(e=>{return {label:e,value:e}});
                const major = await profiles.data.filter(e=>e._userId === user._id)[0].programOfStudy.major.map(e=>{return {label:e,value:e}});
                const minor = await profiles.data.filter(e=>e._userId === user._id)[0].programOfStudy.minor.map(e=>{return {label:e,value:e}});
                const learningType = await profiles.data.filter(e=>e._userId === user._id)[0].learningType;
                const userCourseSchedule = await apiGetCoursesById(courseSchedule);
                setCourseSchedule(userCourseSchedule.data);
                setStudentType(studentType);
                setGraduationYear(graduationYear);
                setLearningType(learningType);
                console.log(learningType);
                if (studentType==='graduate'){
                    setGraduatePOS(graduatePOS);
                }
                if (studentType==='undergraduate'){
                    setMinor(minor);
                    setMajor(major);
                }
            }
        } catch (err){
          console.log(err);
        }  
    }, []);

    return <div style={{backgroundImage: `url(${background})`,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
        <div hidden={currPage === 4} style={{width:'40vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',display:'flex',alignItems: 'center',justifyContent:'center',padding:'1vw'}}>
            <div>
            <SurveyGraduationYear graduationYear={graduationYear} setGraduationYear={setGraduationYear} hidden={currPage !== 0}/>
            <SurveyStudentType studentType={studentType} setStudentType={setStudentType} hidden={currPage !== 1} setMajor={setMajor}/>
            <SurveyProgramOfStudy major={major} setMajor={setMajor} minor={minor} setMinor={setMinor} graduatePOS={graduatePOS} setGraduatePOS={setGraduatePOS} studentType={studentType} hidden={currPage !== 2}/>
            <SurveyLearningType learningType={learningType} setLearningType={setLearningType} hidden={currPage !== 3}/> 
            <SurveyResubmit hidden={currPage !== 5}/>
            <SurveyComplete hidden={currPage !== 6}/>
            <SurveyNavigation currPage={currPage} studentType={studentType} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major} courseSchedule={courseSchedule} profilePayload={profilePayload}graduatePOS={graduatePOS}/>
            
            </div>    
        </div>
            <div hidden={currPage !== 4} style={{display:'flex',alignItems: 'center',justifyContent:"space-between"}}>
                <div style={{width:'40vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',marginRight:'10vw',padding:'1vw',height:'70vh'}}>
                    <CourseSearchImproved courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule}/>
                </div>
                <div style={{width:'40vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',padding:'1vw',height:'70vh'}}>
                    <SurveyCourseSchedule courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule}/>
                    <SurveyNavigation currPage={currPage} studentType={studentType} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major} courseSchedule={courseSchedule} profilePayload={profilePayload} graduatePOS={graduatePOS}/>
                </div>
            </div>
    </div>
              
};

function createStudentProfilePayload(graduationYear,major,minor,graduatePOS,studentType,courseSchedule,learningType,user){
    if (studentType === 'graduate') {
        const graduateObj = {
            _userId:user._id,
            graduationYear:graduationYear,
            studentType:studentType,
            programOfStudy:{graduateProgram:graduatePOS.map((ele)=>ele.value)},
            courseSchedule:courseSchedule.map((ele)=>ele._id),
            learningType:(learningType.length !== 0)?learningType:['prefer not to answer'],
        }
        return graduateObj;
    } else {
        const undergraduateObj = {
            _userId:user._id,
            graduationYear:graduationYear,
            studentType:studentType,
            programOfStudy:{major:major.map((ele)=>ele.value),minor:minor.map((ele)=>ele.value)},
            courseSchedule:courseSchedule.map((ele)=>ele._id),
            learningType:(learningType.length !== 0)?learningType:['prefer not to answer'],
        }
        return undergraduateObj;
    }
};

export default Survey;