import React from 'react';
import {colorPalette} from '../../../utils/design';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {storeCurrPage} from './common';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {apiCreateStudentProfile} from '../../../utils/api';
import {getIsSurveyed} from '../../../utils/common';

function SurveyNavigation({major,setCurrPage,currPage,pageStart,pageEnd,courseSchedule,profilePayload}){ 
    return <div style={{display: 'flex',justifyContent: "space-between"}}>
        <Button
            variant="contained"
            style={{backgroundColor:getButtonColor((currPage === pageStart),colorPalette),color:colorPalette.white}}
            startIcon={<ArrowBackIcon />}
            onClick={()=> {setCurrPage(currPage-1);storeCurrPage(currPage-1);}}
            disabled={(currPage === pageStart)}
            hidden={currPage > pageEnd}
        >
            Back
        </Button>
        <Button
            variant="contained"
            style={{backgroundColor:getButtonColor(((major.length===0 && currPage === 2) || (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 3)),colorPalette),
                color:colorPalette.white}}
            endIcon={<ArrowForwardIcon />}
            onClick={()=> {setCurrPage(currPage+1);storeCurrPage(currPage+1);}}
            disabled={(major.length===0 && currPage === 2) || (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 3)}
            hidden={(currPage >= pageEnd)}
        >
            Next
        </Button>
        <Button
            variant="contained"
            style={{backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
            endIcon={<CheckCircleOutlineIcon />}
            onClick={async()=> {await handleSurveySubmit(profilePayload(),setCurrPage,storeCurrPage)
                console.log("ready to match");profilePayload();
            }}
            disabled={(major.length===0 && currPage ===2) || (courseSchedule.length === 0 && currPage === 3)}
            hidden={currPage<pageEnd || currPage > pageEnd}
        >
            Finish
        </Button>
    </div>
};

async function handleSurveySubmit(payload,setCurrPage,storeCurrPage){
    try {
        const data = await apiCreateStudentProfile(payload);
        sessionStorage.setItem('isSurveyed',true);
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