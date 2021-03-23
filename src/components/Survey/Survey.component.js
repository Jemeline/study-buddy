import React, {useState} from 'react';
import {Button,Col,Container,Form,
    FormGroup,Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap';
import {getUser,getRoleLiteral,} from '../../utils/common';
import SurveyGraduationYear from './SurveyGraduationYear.component';
import background from './survey-background.jpg';

function Survey(){
    const user = JSON.parse(getUser());
    const [currPage, setCurrPage] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);

    return <div style={{backgroundImage: `url(${background})`,disply:'flex',flexDirection:'column',minHeight: '92vh',backgroundSize:"100%",backgroundPosition: 'center'}}> 
            <div style={{width:"45%", top: '55%',left: '50%',position: "absolute",transform: 'translate(-50%, -50%)'}}>
                <SurveyGraduationYear/>
            </div>
    </div>
};

export default Survey;