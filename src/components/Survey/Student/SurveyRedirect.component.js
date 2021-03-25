import React from 'react';
import {colorPalette} from '../../../utils/design';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {getRoleLiteral} from '../../../utils/common';

function SurveyRedirect({hidden,history}){
    return <div hidden={hidden}> 
            <h4>CONGRATUALTIONS, YOU HAVE ALREADY COMPLETED YOUR SURVEY!</h4>
            <br></br>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <Button
                    variant="contained"
                    style={{width:'45%',backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
                    startIcon={<DashboardIcon />}
                    onClick={()=> {history.push(`/dashboard/${getRoleLiteral()}`);}}
                >
                    Go To My Dashboard
                </Button>
                <Button
                    variant="contained"
                    style={{width:'45%',backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
                    startIcon={<AccountCircleIcon />}
                    onClick={()=> {history.push('/student-profile')}}
                >
                    Edit My Profile
                </Button>
            </div>
    </div>
};

export default SurveyRedirect;