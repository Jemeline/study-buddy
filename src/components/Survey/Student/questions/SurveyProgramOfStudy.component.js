import React from 'react';
import {colorPalette} from '../../../../utils/design';
import {Majors,Minors,GraduatePrograms} from '../utils/StudyPrograms';
import Select from 'react-select';
import {storeMajor,storeMinor,storeGraduatePOS} from '../utils/common';

function SurveyProgramOfStudy({major,setMajor,minor,setMinor,graduatePOS,setGraduatePOS,hidden,studentType}){
    const selectMajors = (Majors.map((e)=> {return {label:e,value:e}}))
    const selectGraduatePOS = (GraduatePrograms.map((e)=> {return {label:e,value:e}}))
    const selectMinors = (Minors.map((e)=> {return {label:e,value:e}}))
    const maxOptions = 3;
    const maxOptionsGraduate = 1;
    
    const handleChangeMajor = (e) => {
        setMajor(e);
        storeMajor(e);
    };
    const handleChangeGraduatePOS = (e) => {
      setGraduatePOS(e);
      storeGraduatePOS(e);
    };
    const handleChangeMinor = (e) => {
        setMinor(e);
        storeMinor(e);
    };

    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw',fontFamily: 'Garamond, serif'}}>SELECT YOUR PROGRAM(S) OF STUDY</h4>
            <div hidden={studentType==='undergraduate'} style={{margin:'auto',paddingBottom:'1.5vw'}}>
            <Select
                placeholder={"Select Your Program of Study (Required)"}
                isMulti
                options={(graduatePOS.length) === maxOptionsGraduate ? [] : selectGraduatePOS}
                onChange={(e)=> handleChangeGraduatePOS(e)}
                noOptionsMessage={()=>'Max 1 Selection'}
                styles={colourStyles}
                value={graduatePOS}
                menuPlacement="auto"
            />
            </div>
            <div hidden={studentType==='graduate'} style={{margin:'auto',paddingBottom:'1.5vw'}}>
            <div style={{paddingBottom:'1.5vw'}}>
            <Select
                placeholder={"Select Your Major(s) (Required)"}
                isMulti
                options={(major.length + minor.length) === maxOptions ? [] : selectMajors}
                onChange={(e)=> handleChangeMajor(e)}
                noOptionsMessage={()=>'Max 3 Selections Total'}
                styles={colourStyles}
                value={major}
                menuPlacement="auto"
            />
            </div>
            <Select
                placeholder={"Select Your Minor(s)"}
                isMulti
                options={(major.length + minor.length) === maxOptions ? [] : selectMinors}
                onChange={(e)=> handleChangeMinor(e)}
                noOptionsMessage={()=>'Max 3 Selections'}
                styles={colourStyles}
                value={minor}
                menuPlacement="auto"
            />
            </div>
    </div>
};

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white',width:'38vw'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
        ? null
        : isSelected
        ? colorPalette.secondary
        : isFocused
        ? colorPalette.secondary
        : null,
        color: isDisabled
        ? null
        : isSelected
        ? colorPalette.white
        : isFocused
        ? colorPalette.white
        : null,
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: colorPalette.secondary,
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: colorPalette.white,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: colorPalette.white,
      ':hover': {
        backgroundColor: colorPalette.secondaryA,
        color: colorPalette.white,
      },
    }),
  };

export default SurveyProgramOfStudy;