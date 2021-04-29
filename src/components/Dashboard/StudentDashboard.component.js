import React, { useEffect, useState } from 'react';
import {getIsSurveyed, getUser} from '../../utils/common';
import DashboardUnsurveyed from './DashboardUnsurveyed.component';
import Grid from '@material-ui/core/Grid';
import {colorPalette} from '../../utils/design';

 
function StudentDashboard() {
    return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
      {getIsSurveyed() ?
      <Grid
          container
          direction="row"
          justify="center"
          spacing={1}
      >
          <Grid item  xs="auto" sm="auto" md="auto">
          </Grid>
      </Grid>
      : <DashboardUnsurveyed/>}
    </div>
};
 
export default StudentDashboard;