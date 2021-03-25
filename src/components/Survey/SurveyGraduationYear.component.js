import React from 'react';
import Slider from '@material-ui/core/Slider';
import {colorPalette} from '../../utils/design';
import { withStyles } from '@material-ui/core/styles';
import {storeGraduationYear} from './common';


function SurveyGraduationYear({graduationYear,setGraduationYear,hidden}){
    return <div hidden={hidden}> 
            <h4>WHAT IS YOUR GRADUATION YEAR?</h4>
            <br></br><br></br>
            <h5 style={{backgroundColor:colorPalette.secondaryB,borderRadius: 10, color:colorPalette.white,
                width:'20%',left: '50%',position: "absolute",transform: 'translate(-50%, -50%)', paddingTop:'5px',paddingBottom:'5px'}}>{graduationYear}</h5>
            <br></br><br></br>
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
      color: colorPalette.secondaryB,
      height: 8,
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
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
    mark: {
        backgroundColor: colorPalette.secondaryB,
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