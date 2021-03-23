import React, {useState} from 'react';
import {Button,Col,Container,Form,
    FormGroup,Input,} from 'reactstrap';
import {Alert,Card} from 'react-bootstrap';
import {getUser,getRoleLiteral,} from '../../utils/common';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';

function SurveyGraduationYear(){
    const user = JSON.parse(getUser());
    const [graduationYear, setGraduationYear] = useState(new Date().getFullYear()+2);

    return <div> 
            <Card bg="light" style={{ borderRadius: 8}}>
                <Col>
                    <Card.Body>
                    <h4>WHAT IS YOUR GRADUATION YEAR?</h4>
                    <h6>{graduationYear}</h6>
                    <br></br>
                    <Slider
                        defaultValue={new Date().getFullYear()+2}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={new Date().getFullYear()}
                        max={new Date().getFullYear()+8}
                        onChange = {(e,value)=>setGraduationYear(value)}
                        style = {{thumb: {width: 24,}}}
                    />
                    </Card.Body>
                </Col>
            </Card>
    </div>
};

export default SurveyGraduationYear;