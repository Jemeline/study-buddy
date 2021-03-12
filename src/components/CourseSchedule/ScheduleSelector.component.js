import React, {useState,useEffect} from 'react';
import {Col,Container} from 'reactstrap';
import CourseSearch from './CourseSearch.component';

function ScheduleSelector(){
    return <div>
        <Container fluid={true}>
            <Col sm={6}>
                <CourseSearch/>
            </Col>
        </Container>
    </div>
};

export default ScheduleSelector;