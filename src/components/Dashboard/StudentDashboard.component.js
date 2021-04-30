import React, { useEffect, useState } from 'react';
import {getIsSurveyed, getUser} from '../../utils/common';
import DashboardUnsurveyed from './DashboardUnsurveyed.component';
import Grid from '@material-ui/core/Grid';
import {colorPalette} from '../../utils/design';
import ProfileDashboard from './Student/ProfileDashboard.component';
import InviteDashboard from './Student/InviteDashboard.component';
import FindAStudyBuddyDashboard from './Student/FindAStudyBuddyDashboard.component';

 
function StudentDashboard() {
    
    return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',width:'100vw',overflow:'auto'}}>
      {getIsSurveyed() ?
      <div style={{flexGrow: 1,height:'calc(100vh - 95px)',overflowY:'auto',overflowX:'hidden', margin:'20px'}}>
      <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
      >
          <Grid item xs={3}>
              <InviteDashboard/>
          </Grid>
          <Grid item xs={5}>
          </Grid>
          <Grid item xs={4}>
            <ProfileDashboard/>
          </Grid>

          <Grid item xs={5}>
            <FindAStudyBuddyDashboard/>
          </Grid>
          <Grid item xs={7}>
          </Grid>

          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
          </Grid>
      </Grid>
      </div>
      : <DashboardUnsurveyed/>}
    </div>
};
 
export default StudentDashboard;