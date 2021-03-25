import React, {useState} from 'react';
import {Col} from 'reactstrap';
import {Card} from 'react-bootstrap';
import {getUser} from '../../utils/common';
import SurveyGraduationYear from './SurveyGraduationYear.component';
import SurveyProgramOfStudy from './SurveyProgramOfStudy.component';
import SurveyStudentType from './SurveyStudentType.component';
import background from './survey-background.jpg';
import {colorPalette} from '../../utils/design';
import SurveyCourseSchedule from './SurveyCourseSchedule.component';
import CourseSearchImproved from '../CourseSchedule/CourseSearchImproved.component';
import SurveyNavigation from './SurveyNavigation.component';
import {getGraduationYear,getStudentType,getMajor,getMinor,getCurrPage,getCourseSchedule} from './common';

function Survey(){
    const user = JSON.parse(getUser());
    const [currPage, setCurrPage] = useState((getCurrPage() !== null)? parseInt(getCurrPage()) : 0);
    const pageStart = 0;
    const pageEnd = 3;
    const [graduationYear, setGraduationYear] = useState((getGraduationYear() !== null) ? parseInt(getGraduationYear()) : new Date().getFullYear()+2);
    const [major, setMajor] = useState((getMajor() !== null) ? JSON.parse(getMajor()) : []);
    const [minor, setMinor] = useState((getMinor() !== null) ? JSON.parse(getMinor()) : []);
    const [studentType, setStudentType] = useState((getStudentType() !== null) ? getStudentType() : 'undergraduate');
    const [courseSchedule, setCourseSchedule] = useState((getCourseSchedule() !== null) ? JSON.parse(getCourseSchedule()) : []);


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
                            <br></br>
                            <SurveyNavigation currPage={currPage} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major}/>
                        </Card.Body>
                    </Col>
                </Card>
            </div>
                <div hidden={currPage === 3} style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height: '92vh'}}>
                <Card style={{backgroundColor:colorPalette.white,boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',width:'45%',}}>
                    <Col>
                        <Card.Body>
                            <SurveyGraduationYear graduationYear={graduationYear} setGraduationYear={setGraduationYear} hidden={currPage !== 0}/>
                            <SurveyProgramOfStudy major={major} setMajor={setMajor} minor={minor} setMinor={setMinor} hidden={currPage !== 1}/>
                            <SurveyStudentType studentType={studentType} setStudentType={setStudentType} hidden={currPage !== 2}/>
                            <br></br>
                            <SurveyNavigation currPage={currPage} setCurrPage={setCurrPage} pageEnd={pageEnd} pageStart={pageStart} major={major}/>
                        </Card.Body>
                    </Col>    
                </Card>
            </div>
    </div>
};

export default Survey;