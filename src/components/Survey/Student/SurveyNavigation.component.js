/* Author: Jada Pfeiffer
Purpose: This is the survey navigation module
It takes in the current page, and start and finish pages as well
as several of the responses to hide/show and disable/enable 
navigation buttons at the proper time in the survey
Additionally, it contains the submit buttons that 
send the survey data to the backend
Route: https://study-buddy-d452c.web.app/student-survey
*/
import React from 'react';
import {colorPalette} from '../../../utils/design';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {storeCurrPage} from './utils/common';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {apiCreateStudentProfile,apiResubmitStudentProfile} from '../../../utils/api';
import {getIsSurveyed,getUser,login} from '../../../utils/common';
import { useHistory } from "react-router-dom";

function SurveyNavigation({major,setCurrPage,currPage,pageStart,pageEnd,courseSchedule,profilePayload,graduatePOS,studentType}){ 
    const history = useHistory();
    const user = JSON.parse(getUser());

    return <div style={{display: 'flex',justifyContent: "space-between",height:'6vh',marginTop:'1vh',marginBottom:'1vh'}}>
        <Button
            variant="contained"
            style={{width:'12vw',fontSize:'1vw',backgroundColor:colorPalette.secondary,color:colorPalette.white}}
            startIcon={<ArrowBackIcon />}
            onClick={()=> {
                if (currPage === pageStart){
                    history.push(`/dashboard/${user.role}`);
                } else if (currPage === pageEnd){
                    setCurrPage(currPage-2);
                    storeCurrPage(currPage-2);
                } else {
                    setCurrPage(currPage-1);
                    storeCurrPage(currPage-1);
                }
            }}
            hidden={currPage > pageEnd+2}
        >Back
        </Button>
        <Button
            variant="contained"
            style={{width:'12vw',fontSize:'1vw',backgroundColor:getButtonColor(((major.length===0  && studentType === 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd+1) || (courseSchedule.length === 0 && currPage === (pageEnd-2))),colorPalette),
                color:colorPalette.white}}
            endIcon={<ArrowForwardIcon />}
            onClick={()=> {setCurrPage(currPage+1);storeCurrPage(currPage+1);}}
            disabled={(major.length===0  && studentType=== 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd+1) || (courseSchedule.length === 0 && currPage === (pageEnd-2))}
            hidden={(currPage >= pageEnd-2)}
        >Next
        </Button>
        <Button
            variant="contained"
            style={{width:'12vw',fontSize:'1vw',backgroundColor:getButtonColor(((major.length===0  && studentType=== 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd+1) || (courseSchedule.length === 0 && currPage === (pageEnd-2))),colorPalette),color:colorPalette.white}}
            endIcon={<CheckCircleOutlineIcon />}
            onClick={async()=> {
                await handleSurveySubmit(profilePayload(),setCurrPage,storeCurrPage,pageEnd);
            }}
            disabled={(major.length===0  && studentType=== 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd+1) || (courseSchedule.length === 0 && currPage === (pageEnd-2))}
            hidden={!(currPage === pageEnd-2)}
        >Finish
        </Button>
        <Button
            variant="contained"
            style={{width:'12vw',backgroundColor:colorPalette.secondary,color:colorPalette.white,fontSize:'1vw'}}
            onClick={async()=> {
                await handleSurveyResubmit(profilePayload(),setCurrPage,storeCurrPage,pageEnd);
            }}
            hidden={currPage !==(pageEnd-1)}
        >Yes, Resubmit
        </Button>
        <Button 
            variant="contained"
            style={{width:'12vw',backgroundColor:colorPalette.secondary,color:colorPalette.white,fontSize:'0.9vw'}}
            onClick={() => {history.push('/dashboard/student');storeCurrPage(0);}}
            hidden={currPage !==pageEnd}
        > Go To Dashboard
        </Button>
    </div>
};

async function handleSurveySubmit(payload,setCurrPage,storeCurrPage,pageEnd){
    try {
        if (getIsSurveyed()){
            setCurrPage(pageEnd-1);
            storeCurrPage(pageEnd-1);
        } else {
            const data = await apiCreateStudentProfile(payload);
            sessionStorage.setItem('isSurveyed',true);
            const newUser = JSON.parse(getUser());
            newUser.isSurveyed = true;
            login(newUser,newUser.role,newUser.isVerified,newUser.isSurveyed);
            setCurrPage(pageEnd);
            storeCurrPage(pageEnd);
        }
    } catch (error){
        console.log(error);
    };
};

async function handleSurveyResubmit(payload,setCurrPage,storeCurrPage,pageEnd){
    try {
        const data = await apiResubmitStudentProfile(payload);
        setCurrPage(pageEnd);
        storeCurrPage(pageEnd);
    } catch (error){
        console.log(error);
    };
};

function getButtonColor(disabled,colorPalette) {
    if (disabled) return colorPalette.darkGray;
    return colorPalette.secondary;
};

export default SurveyNavigation;