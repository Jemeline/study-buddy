import React from 'react';
import {colorPalette} from '../../../utils/design';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {storeCurrPage} from './common';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {apiCreateStudentProfile,apiResubmitStudentProfile} from '../../../utils/api';
import {getIsSurveyed} from '../../../utils/common';

function SurveyNavigation({major,setCurrPage,currPage,pageStart,pageEnd,courseSchedule,profilePayload,graduatePOS}){ 
    return <div style={{display: 'flex',justifyContent: "space-between"}}>
        <Button
            variant="contained"
            style={{width:'30%',backgroundColor:getButtonColor((currPage === pageStart),colorPalette),color:colorPalette.white}}
            startIcon={<ArrowBackIcon />}
            onClick={()=> {setCurrPage(currPage-1);storeCurrPage(currPage-1);}}
            disabled={(currPage === pageStart)}
            hidden={currPage > pageEnd}
        >
            Back
        </Button>
        <Button
            variant="contained"
            style={{width:'30%',backgroundColor:getButtonColor((((major.length===0 && graduatePOS.length === 0) && currPage === 2) || (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 3)),colorPalette),
                color:colorPalette.white}}
            endIcon={<ArrowForwardIcon />}
            onClick={()=> {setCurrPage(currPage+1);storeCurrPage(currPage+1);}}
            disabled={((major.length===0 && graduatePOS.length === 0) && currPage === 2) || (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 3)}
            hidden={(currPage >= pageEnd-1)}
        >
            Next
        </Button>
        <Button
            variant="contained"
            style={{width:'30%',backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
            endIcon={<CheckCircleOutlineIcon />}
            onClick={async()=> {
                await handleSurveySubmit(profilePayload(),setCurrPage,storeCurrPage);
            }}
            disabled={((major.length===0 && graduatePOS.length === 0) && currPage === 2) || (courseSchedule.length === 0 && currPage === 3)}
            hidden={!(currPage === pageEnd-1)}
        >
            Finish
        </Button>
        <Button
            variant="contained"
            style={{width:'30%',backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
            onClick={async()=> {
                await handleSurveyResubmit(profilePayload(),setCurrPage,storeCurrPage);
            }}
            hidden={currPage !==5}
        >
            Yes, Resubmit
        </Button>
    </div>
};

async function handleSurveySubmit(payload,setCurrPage,storeCurrPage){
    try {
        if (getIsSurveyed()){
            setCurrPage(5);
            storeCurrPage(5);
        } else {
            const data = await apiCreateStudentProfile(payload);
            sessionStorage.setItem('isSurveyed',true);
            setCurrPage(6);
            storeCurrPage(6);
        }
    } catch (error){
        console.log(error);
    };
};

async function handleSurveyResubmit(payload,setCurrPage,storeCurrPage){
    try {
        const data = await apiResubmitStudentProfile(payload);
        setCurrPage(6);
        storeCurrPage(6);
    } catch (error){
        console.log(error);
    };
};

function getButtonColor(disabled,colorPalette) {
    if (disabled) return '#8c979a';
    return colorPalette.secondaryB;
};

export default SurveyNavigation;