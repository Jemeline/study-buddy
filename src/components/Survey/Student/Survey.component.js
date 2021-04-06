import React, {useState} from 'react';
import {Col} from 'reactstrap';
import {Card} from 'react-bootstrap';
import {getUser} from '../../../utils/common';
import SurveyGraduationYear from './SurveyGraduationYear.component';
import SurveyProgramOfStudy from './SurveyProgramOfStudy.component';
import SurveyStudentType from './SurveyStudentType.component';
import SurveyLearningType from './SurveyLearningType.component';
import background from '../survey-background.jpg';
import {colorPalette} from '../../../utils/design';
import SurveyCourseSchedule from './SurveyCourseSchedule.component';
import CourseSearchImproved from '../../CourseSchedule/CourseSearchImproved.component';
import SurveyNavigation from './SurveyNavigation.component';
import SurveyResubmit from './SurveyResubmit.component';
import SurveyComplete from './SurveyComplete.component';
import {getGraduationYear,getStudentType,getMajor,getMinor,getCurrPage,getCourseSchedule,getLearningType,getGraduatePOS} from './common';
import { useHistory } from "react-router-dom";

function Survey(){
    const user = JSON.parse(getUser());
    const [currPage, setCurrPage] = useState((getCurrPage() !== null)? parseInt(getCurrPage()) : 0);
    const pageStart = 0;
    const pageEnd = 5;
    const [graduationYear, setGraduationYear] = useState((getGraduationYear() !== null) ? parseInt(getGraduationYear()) : new Date().getFullYear()+2);
    const [minor, setMinor] = useState((getMinor() !== null) ? JSON.parse(getMinor()) : []);
    const [major, setMajor] = useState((getMajor() !== null) ? JSON.parse(getMajor()) : []);
    const [graduatePOS, setGraduatePOS] = useState((getGraduatePOS() !== null) ? JSON.parse(getGraduatePOS()) : []);
    const [studentType, setStudentType] = useState((getStudentType() !== null) ? getStudentType() : 'undergraduate');
    const [courseSchedule, setCourseSchedule] = useState((getCourseSchedule() !== null) ? JSON.parse(getCourseSchedule()) : []);
    const [learningType, setLearningType] = useState((getLearningType() !== null) ? JSON.parse(getLearningType()) : []);
    const profilePayload = () => createStudentProfilePayload(graduationYear,major,minor,graduatePOS,studentType,courseSchedule,learningType,user);
    const history = useHistory();
    
    return <div style={{backgroundImage: `url(${background})`,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
        <div hidden={currPage === 3} style={{width:'40vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',display:'flex',alignItems: 'center',justifyContent:'center',padding:'1vw'}}>
            <div>
            <SurveyGraduationYear graduationYear={graduationYear} setGraduationYear={setGraduationYear} hidden={currPage !== 0}/>
            <SurveyStudentType studentType={studentType} setStudentType={setStudentType} hidden={currPage !== 1} setMajor={setMajor}/>
            <SurveyProgramOfStudy major={major} setMajor={setMajor} minor={minor} setMinor={setMinor} graduatePOS={graduatePOS} setGraduatePOS={setGraduatePOS} studentType={studentType} hidden={currPage !== 2}/>
            <SurveyLearningType learningType={learningType} setLearningType={setLearningType} hidden={currPage !== 4}/> 
            <SurveyResubmit hidden={currPage !== 5}/>
            <SurveyComplete hidden={currPage !== 6}/>
            <SurveyNavigation currPage={currPage} studentType={studentType} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major} courseSchedule={courseSchedule} profilePayload={profilePayload}graduatePOS={graduatePOS}/>
            
            </div>    
        </div>
            <div hidden={currPage !== 3} style={{display:'flex',alignItems: 'center',justifyContent:"space-between"}}>
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
    console.log(user);
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