import React from 'react';
import {colorPalette} from '../../../utils/design';
import {Majors,Minors,GraduatePrograms} from './StudyPrograms';
import Select from 'react-select';
import {storeMajor,storeMinor,storeGraduatePOS} from './common';

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
            <h4>SELECT YOUR PROGRAM(S) OF STUDY</h4>
            <br></br>
            <div hidden={studentType==='undergraduate'}>
            <Select
                placeholder={"Select Your Program of Study (Required)"}
                isMulti
                options={(graduatePOS.length) === maxOptionsGraduate ? [] : selectGraduatePOS}
                onChange={(e)=> handleChangeGraduatePOS(e)}
                noOptionsMessage={()=>'Max 1 Selection'}
                styles={colourStyles}
                value={graduatePOS}
            />
            </div>
            <div hidden={studentType==='graduate'}>
            <Select
                placeholder={"Select Your Major(s) (Required)"}
                isMulti
                options={(major.length + minor.length) === maxOptions ? [] : selectMajors}
                onChange={(e)=> handleChangeMajor(e)}
                noOptionsMessage={()=>'Max 3 Selections'}
                styles={colourStyles}
                value={major}
            />
            <br></br>
            <Select
                placeholder={"Select Your Minor(s)"}
                isMulti
                options={(major.length + minor.length) === maxOptions ? [] : selectMinors}
                onChange={(e)=> handleChangeMinor(e)}
                noOptionsMessage={()=>'Max 3 Selections'}
                styles={colourStyles}
                value={minor}
            />
            </div>
    </div>
};

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
        ? null
        : isSelected
        ? colorPalette.secondaryB
        : isFocused
        ? colorPalette.secondaryB
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
        backgroundColor: colorPalette.secondaryB,
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