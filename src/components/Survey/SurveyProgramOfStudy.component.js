import React from 'react';
import {colorPalette} from '../../utils/design';
import {Majors,Minors} from './StudyPrograms';
import Select from 'react-select';
import {storeMajor,storeMinor} from './common';

const selectMajors = (Majors.map((e)=> {return {label:e,value:e}}))
const selectMinors = (Minors.map((e)=> {return {label:e,value:e}}))

function SurveyProgramOfStudy({major,setMajor,minor,setMinor,hidden}){
    const maxOptions = 3;
    
    const handleChangeMajor = (e) => {
        setMajor(e);
        storeMajor(e);
    };
    const handleChangeMinor = (e) => {
        setMinor(e);
        storeMinor(e);
    };
    return <div hidden={hidden}> 
            <h4>SELECT YOUR PROGRAM(S) OF STUDY</h4>
            <br></br>
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