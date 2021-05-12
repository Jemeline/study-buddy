/* Author: Jada Pfeiffer
Purpose: Display courses selected in current student schedule during survey
Implements Course Component and interacts with CourseSearchImproved Component
Passes courseSchedule back up to main survey component
Route: https://study-buddy-d452c.web.app/student-survey
*/
import React from 'react';
import Course from '../../../CourseSchedule/Course.component';
import Grid from '@material-ui/core/Grid';

function SurveyCourseSchedule({courseSchedule,setCourseSchedule,hidden}){
    return <div hidden={hidden} style={{marginBottom:'1vh'}}> 
            <h4 style={{margin:'auto',fontSize:'2vw',height:'6vh',fontFamily: 'Garamond, serif'}}>WHAT IS YOUR COURSE SCHEDULE?</h4>
            <div style={{flexGrow: 1,height:'54vh',overflowY:'auto'}}>
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

export default SurveyCourseSchedule;