import React from 'react';
import Slider from '@material-ui/core/Slider';
import {colorPalette} from '../../../../utils/design';
import { withStyles } from '@material-ui/core/styles';
import {storeGraduationYear} from '../utils/common';
import SurveyNavigation from '../SurveyNavigation.component';


function SurveyGraduationYear({graduationYear,setGraduationYear,hidden}){
    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw'}}>WHAT IS YOUR GRADUATION YEAR?</h4>
            <h5 style={{paddingBottom:'1.5vw',backgroundColor:colorPalette.secondary,borderRadius: 10,color:colorPalette.white,paddingTop:'5px',paddingBottom:'5px',width:'6vw',margin:'auto',fontSize:'2vw'}}>{graduationYear}</h5>
            <YearSlider
                defaultValue={new Date().getFullYear()+2}
                value={graduationYear}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="off"
                step={1}
                marks
                min={new Date().getFullYear()}
                max={new Date().getFullYear()+8}
                onChange = {(e,value)=>{setGraduationYear(value);storeGraduationYear(value);}}
            />        
    </div>
};

const YearSlider = withStyles({
    root: {
      color: colorPalette.secondary,
      height: 8,
      paddingTop:'1.5vw',
      width:'35vw'
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 10,
    },
    rail: {
      height: 8,
      borderRadius: 10,
    },
    mark: {
        backgroundColor: colorPalette.secondary,
        height: 8,
        width: 1,
        marginTop: -1,
    },
    markActive: {
        opacity: 0,
        backgroundColor: 'currentColor',
    },
  })(Slider);

export default SurveyGraduationYear;