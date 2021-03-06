/* Author: Jada Pfeiffer
Purpose: Utilizes MUI Grid to display all dashboard components once
student has taken survey
Route: https://study-buddy-d452c.web.app/dashboard/student
*/
import React, { useEffect, useState } from 'react';
import {getIsSurveyed, getUser} from '../../utils/common';
import DashboardUnsurveyed from './DashboardUnsurveyed.component';
import Grid from '@material-ui/core/Grid';
import {colorPalette} from '../../utils/design';
import ProfileDashboard from './Student/ProfileDashboard.component';
import InviteDashboard from './Student/InviteDashboard.component';
import FindAStudyBuddyDashboard from './Student/FindAStudyBuddyDashboard.component';
import SuggestedTutorsDashboard from './Student/SuggestedTutorsDashboard.component';
import CourseScheduleDashboard from './Student/CourseScheduleDashboard.component';
import CalendarDashboard from './Student/CalendarDashboard.component';
import StudentClassListDashboard from './Student/StudentClassListDashboard.component';
import CreateGroupDashboard from './Student/CreateGroupDashboard.component';
import SuggestedMatchesDashboard from './Student/SuggestedMatchesDashboard.component';
import HelpCenterDashboard from './Student/HelpCenterDashboard.component';
import HighestMatchDashboard from './Student/HighestMatchDashboard.component';

function StudentDashboard() {
    const user = JSON.parse(getUser());
    return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',width:'100vw',overflow:'auto'}}>
      {getIsSurveyed() ?
      <div style={{flexGrow: 1,height:'calc(100vh - 95px)',overflowY:'auto',overflowX:'hidden', margin:'20px'}}>
      <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
      >
          <Grid item xs={2}>
            <HelpCenterDashboard/>
          </Grid>
          <Grid item xs={3}>
            <InviteDashboard/>
          </Grid>
          <Grid item xs={3}>
            <HighestMatchDashboard/>
          </Grid>
          <Grid item xs={4}>
            <ProfileDashboard/>
          </Grid>

          <Grid item xs={6}>
            <SuggestedMatchesDashboard/>
          </Grid>
          <Grid item xs={6}>
            <StudentClassListDashboard/>
          </Grid>
          

          <Grid item xs={4}> 
            <CalendarDashboard user={user}/>
          </Grid>
          <Grid item xs={5}>
            <CourseScheduleDashboard/>
          </Grid>
          <Grid item xs={3}>
            <CreateGroupDashboard/>
          </Grid>

          
          <Grid item xs={6}>
            <FindAStudyBuddyDashboard/>
          </Grid>
          <Grid item xs={6}>
            <SuggestedTutorsDashboard/>
          </Grid>
          
      </Grid>
      </div>
      : <DashboardUnsurveyed/>}
    </div>
};
 
export default StudentDashboard;