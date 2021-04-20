import React, { useEffect, useState } from 'react';
import {getIsSurveyed, getUser} from '../../utils/common';
import DashboardUnsurveyed from './DashboardUnsurveyed.component';
import Grid from '@material-ui/core/Grid';
import {colorPalette} from '../../utils/design';
import StudentUserList from './Student/StudentUserList.component';
import { apiGetStudentProfile } from '../../utils/api';
import { getWeightedSum } from '../Survey/MatchingAlgorithm';
 
function StudentDashboard() {

  // const [userSums, setUserSums] = useState([]);

  // useEffect(async () => {
  //   if (getIsSurveyed()) {
  //     const user = JSON.parse(getUser());
  //     const profile = (await apiGetStudentProfile(user._id)).data;
  //     setUserSums(await getWeightedSum(profile));
  //   }
  // }, [getIsSurveyed()]);

    return <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
      {getIsSurveyed() ?
      // <Grid
      //     container
      //     direction="row"
      //     justify="flex-start"
      //     spacing={1}
      // >
      //   <Grid xs={12} sm={6} md={3}>
          
      //   </Grid>
      // </Grid>  

      <StudentUserList />
      : <DashboardUnsurveyed/>}
    </div>
};
 
export default StudentDashboard;