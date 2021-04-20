import React from 'react';
import logo from '../../study-buddy.png';
 
function StudentUnsurveyed() {

    return <div style={{width:'40vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',display:'flex',alignItems: 'center',justifyContent:'center',padding:'1vw'}}>
      <div>
        <img src={logo} style={{height: '20vh'}}/>
        <p style={{margin:'auto',paddingBottom:'1vw',fontSize:'1.5vw'}}>This student must take the survey before you can view their study preferences.</p>
      </div>
    </div>
};
 
export default StudentUnsurveyed;