import React from 'react';
import {getIsSurveyed} from '../../utils/common';
import DashboardUnsurveyed from './DashboardUnsurveyed.component';
import Grid from '@material-ui/core/Grid';
import {colorPalette} from '../../utils/design';
 
function StudentDashboard() {

  

    return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center'}}>
      {getIsSurveyed() ?
      <Grid
          container
          direction="row"
          justify="flex-start"
          spacing={1}
      >
        <Grid xs={12} sm={6} md={3} style={{border: "3px solid black"}}>
          <h6 >Top Matches For You</h6>
        </Grid>
        
      </Grid>  
      : <DashboardUnsurveyed/>}
    </div>
};
 
export default StudentDashboard;