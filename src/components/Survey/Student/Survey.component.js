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

    return <div style={{backgroundImage: `url(${background})`,backgroundSize:"cover",backgroundPosition: 'center'}}> 
            <div hidden={currPage !== 3} style={{display: 'flex',justifyContent: "space-between",alignItems: 'center',justifyContent: 'center',height: '92vh'}}>
                <Card style={{marginLeft:'3%', marginRight:'3%', width:'45%',backgroundColor:colorPalette.white,boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                    <Col>
                        <Card.Body>
                            <CourseSearchImproved courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule}/>
                        </Card.Body>
                    </Col>
                </Card>
                <Card style={{marginRight:'3%',marginLeft:'3%',width:'45%',backgroundColor:colorPalette.white,boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                    <Col>
                        <Card.Body>
                            <SurveyCourseSchedule hidden={currPage !== 3} courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule}/>
                            <br hidden={currPage>pageEnd}></br>
                            <SurveyNavigation currPage={currPage} studentType={studentType} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major} courseSchedule={courseSchedule} profilePayload={profilePayload} graduatePOS={graduatePOS}/>
                        </Card.Body>
                    </Col>
                </Card>
            </div>
                <div hidden={currPage === 3} style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height: '92vh'}}>
                <Card style={{backgroundColor:colorPalette.white,boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',width:'45%',}}>
                    <Col>
                        <Card.Body>
                            <SurveyGraduationYear graduationYear={graduationYear} setGraduationYear={setGraduationYear} hidden={currPage !== 0}/>
                            <SurveyProgramOfStudy major={major} setMajor={setMajor} minor={minor} setMinor={setMinor} graduatePOS={graduatePOS} setGraduatePOS={setGraduatePOS} studentType={studentType} hidden={currPage !== 2}/>
                            <SurveyStudentType studentType={studentType} setStudentType={setStudentType} hidden={currPage !== 1} setMajor={setMajor}/>
                            <SurveyLearningType learningType={learningType} setLearningType={setLearningType} hidden={currPage !== 4}/> 
                            <SurveyComplete hidden={currPage !== 6} />
                            <SurveyResubmit hidden={currPage !== 5}/>
                            <br></br>
                            <SurveyNavigation currPage={currPage} studentType={studentType} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major} courseSchedule={courseSchedule} profilePayload={profilePayload}graduatePOS={graduatePOS}/>
                        </Card.Body>
                    </Col>    
                </Card>
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