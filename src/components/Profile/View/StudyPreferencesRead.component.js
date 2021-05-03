import React from 'react';
import {colorPalette} from '../../../utils/design';
import { InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';
import Select from 'react-select';

function StudyPreferencesRead({profile}) {
    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Study Preferences</h5>
      <div style={{width:'65vw',display:'flex',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw',width:'30vw'}}>
        <br/>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Graduation Year</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white',fontSize:'1.2vw'}} value={profile.graduationYear}/>
          </InputGroup>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Student Type</InputGroupText>
            </InputGroupAddon>
                <Input type="select" value={profile.studentType} style={{backgroundColor:'white',fontSize:'1.2vw'}} disabled>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                </Input>
          </InputGroup>
          <div style={{paddingBottom:'1vw'}}>
                <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Learning Type</p>
                <Select
                    placeholder={"Identifier(s)"}
                    isMulti
                    styles={colourStylesNarrow}
                    value={profile.identifiers.map((e)=> {return {label:e,value:e}})}
                    menuPlacement="auto"
                    isDisabled={true}
                />
          </div>
        </div>
        <div style={{margin:'1vw',width:'50vw'}}>
            <div hidden={profile.studentType === 'graduate'}>
            <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Majors</p>
            <Select
                placeholder={"My Major(s)"}
                isMulti
                styles={colourStyles}
                value={profile.programOfStudy.major.map((e)=> {return {label:e,value:e}})}
                menuPlacement="auto"
                isDisabled={true}
                hidden={profile.studentType === 'graduate'}
                style={{marginBottom:'1vw'}}
            />
            </div>
            <div style={{paddingBottom:'1vw'}} hidden={profile.studentType === 'graduate'}>
            <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Minors</p>
            <Select
                placeholder={"My Minor(s)"}
                isMulti
                styles={colourStyles}
                value={profile.programOfStudy.minor.map((e)=> {return {label:e,value:e}})}
                menuPlacement="auto"
                isDisabled={true}
                hidden={profile.studentType === 'graduate'}
                style={{marginBottom:'1vw'}}  
            />
            </div>
            <div style={{paddingBottom:'1vw'}} hidden={profile.studentType === 'undergraduate'}>
            <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Program of Study</p>
            <Select
                placeholder={"Program of Study"}
                isMulti
                styles={colourStyles}
                value={profile.programOfStudy.graduateProgram.map((e)=> {return {label:e,value:e}})}
                menuPlacement="auto"
                isDisabled={true}
                hidden={profile.studentType === 'undergraduate'}
            />
            </div>
            <div style={{paddingBottom:'1vw'}}>
                <p style={{float:'left',fontSize:'1vw',marginBottom:0}}>Learning Type</p>
                <Select
                    placeholder={"Learning Type(s)"}
                    isMulti
                    styles={colourStyles}
                    value={profile.learningType.map((e)=> {return {label:e,value:e}})}
                    menuPlacement="auto"
                    isDisabled={true}
                />
            </div>
        </div>
      </div>
    </div>
};

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white',width:'35vw'}),
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
      fontSize:'1.2vw'
    }),
    placeholder: (styles, { data }) => ({
        ...styles,
        fontSize:'1.2vw'
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

export const colourStylesNarrow = {
  control: styles => ({ ...styles, backgroundColor: 'white',width:'25vw'}),
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
    fontSize:'1.2vw'
  }),
  placeholder: (styles, { data }) => ({
      ...styles,
      fontSize:'1.2vw'
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
export default StudyPreferencesRead;