/* Author: Jada Pfeiffer
Purpose: Displays when student has not taken survey yet instead of normal
dashboard components
Route: https://study-buddy-d452c.web.app/dashboard/student
*/
import React from 'react';
import {getUser,capitalizeFirst} from '../../utils/common';
import logo from '../study-buddy.png';
import {Button} from 'reactstrap';
import {colorPalette} from '../../utils/design';
import { useHistory } from "react-router-dom";
 
function DashboardUnsurveyed() {
    const user = JSON.parse(getUser());
    const history = useHistory();

    return <div style={{width:'40vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',display:'flex',alignItems: 'center',justifyContent:'center',padding:'1vw'}}>
      <div>
        <img src={logo} style={{height: '20vh'}}/>
        <h4 style={{margin:'auto',paddingBottom:'0.5vw',fontSize:'2vw'}}>Welcome, {capitalizeFirst(user.first)}!</h4>
        <p style={{margin:'auto',paddingBottom:'1vw',fontSize:'1.5vw'}}>In order to pair you with the most compatible study partners, we need to get to know you a little better. Take our short survey to get started.</p>
        <Button
            size="sm"
            onClick={async (e) => {history.push('/student-survey');}}
            style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,borderRadius:14,margin:'auto',width:'20vw',height:'5vh',fontSize:'1vw'}}                                                                                                                
        > Take the Survey Now
        </Button>
      </div>
    </div>
};
 
export default DashboardUnsurveyed;