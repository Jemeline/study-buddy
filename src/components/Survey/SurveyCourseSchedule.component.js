import React from 'react';
import './survey.css';
import Course from '../CourseSchedule/Course.component';
import Grid from '@material-ui/core/Grid';

function SurveyStudentType({courseSchedule,setCourseSchedule,hidden}){
    return <div hidden={hidden}> 
            <h4>WHAT IS YOUR COURSE SCHEDULE?</h4>
            <br/>
            <div style={{flexGrow: 1,height:'57vh',overflowY:'auto'}}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                spacing={1}
            >
            {courseSchedule.map(item => (
                <Grid item xs={12} sm={6} md={3} key={item._id}  >
                    <Course course={item} courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule} hideAddButton={true} ></Course>
                </Grid>
            ))}
            </Grid>
            </div>
    </div>
};

export default SurveyStudentType;