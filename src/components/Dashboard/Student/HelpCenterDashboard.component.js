import React, { useState,useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import logo from '../../study-buddy.png';
import { useHistory } from "react-router-dom";


function HelpCenterDashboard() {
    const history = useHistory();
    return (
        <Paper data-testid='Help-Dashboard' style={{overflow:'auto',height:'225px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer'}} onClick={()=>history.push('/student-help')}>
                <img src={logo} alt="logo" style={{height: '150px',margin:0}}/>
                <p style={{marginBottom:'2px',marginTop:'0px',fontFamily: 'Garamond, serif',fontSize:'15px'}}><em>Need Help?</em></p>
                <h6 style={{marginBottom:'4px',marginTop:'0px',fontFamily: 'Garamond, serif',fontSize:'20px'}}>Study Buddy Help Center</h6>
        </Paper>
    );
}

export default HelpCenterDashboard;