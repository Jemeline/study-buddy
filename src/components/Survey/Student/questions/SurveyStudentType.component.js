/* Author: Jada Pfeiffer
Purpose: Survey question about student type
Uses css to display outlines around selected student type and MUI icons
Passes studentType back up to main survey component
Route: https://study-buddy-d452c.web.app/student-survey
*/
import React, {useState,useEffect} from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import '../../survey.css';
import {storeStudentType} from '../utils/common';

function SurveyStudentType({studentType,setStudentType,hidden}){
    const [graduateClassName, setGraduateClassName] = useState((studentType==='graduate') ? 'selected': '');
    const [undergraduateClassName, setUndergraduateClassName] = useState((studentType==='undergraduate') ? 'selected': '');

    useEffect(async () => {
        setGraduateClassName((studentType==='graduate') ? 'selected': '');
        setUndergraduateClassName((studentType==='undergraduate') ? 'selected': '');    
    }, [studentType]);

    
    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw',fontFamily: 'Garamond, serif'}}>WHICH TYPE OF STUDENT ARE YOU?</h4>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={graduateClassName} onClick={(e)=>{setGraduateClassName('selected');setUndergraduateClassName('');setStudentType('graduate');storeStudentType('graduate');}} style={{marginLeft:"8%",width: '40%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <SchoolIcon fontSize="large"/>
                    <h5 style={{fontSize:'1.75vw'}}>Graduate</h5>
                    <br></br>
                </div>
                <div className={undergraduateClassName} onClick={(e)=>{setGraduateClassName('');setUndergraduateClassName('selected');setStudentType('undergraduate');storeStudentType('undergraduate');}} style={{marginRight:"8%",width: '40%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <MenuBookIcon fontSize="large"/>
                    <h5 style={{fontSize:'1.75vw'}}>Undergraduate</h5>
                    <br></br>
                </div>
            </div>
            <br></br>
    </div>
};

export default SurveyStudentType;