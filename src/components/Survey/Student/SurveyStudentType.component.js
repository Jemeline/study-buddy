import React, {useState,useEffect} from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import '../survey.css';
import {storeStudentType,storeMajor} from './common';

function SurveyStudentType({studentType,setStudentType,hidden}){
    const [graduateClassName, setGraduateClassName] = useState((studentType==='graduate') ? 'selected': '');
    const [undergraduateClassName, setUndergraduateClassName] = useState((studentType==='undergraduate') ? 'selected': '');

    return <div hidden={hidden}> 
            <h4>WHICH TYPE OF STUDENT ARE YOU?</h4>
            <br></br>
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