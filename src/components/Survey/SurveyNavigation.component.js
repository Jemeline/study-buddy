import React from 'react';
import {colorPalette} from '../../utils/design';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {storeCurrPage} from './common';

function SurveyNavigation({major,setCurrPage,currPage,pageStart,pageEnd}){ 
    return <div style={{display: 'flex',justifyContent: "space-between"}}>
        <Button
            variant="contained"
            style={{backgroundColor:getButtonColor((currPage === pageStart),colorPalette),color:colorPalette.white}}
            startIcon={<ArrowBackIcon />}
            onClick={()=> {setCurrPage(currPage-1);storeCurrPage(currPage-1);}}
            disabled={(currPage === pageStart)}
        >
            Back
        </Button>
        <Button
            variant="contained"
            style={{backgroundColor:getButtonColor(((major.length===0 && currPage ===1)|| (currPage === pageEnd)),colorPalette),
                color:colorPalette.white}}
            endIcon={<ArrowForwardIcon />}
            onClick={()=> {setCurrPage(currPage+1);storeCurrPage(currPage+1);}}
            disabled={(major.length===0 && currPage ===1) || (currPage === pageEnd)}
        >
            Next
        </Button>
    </div>
};


function getButtonColor(disabled,colorPalette) {
    if (disabled) return '#8c979a';
    return colorPalette.secondaryB;
};

export default SurveyNavigation;