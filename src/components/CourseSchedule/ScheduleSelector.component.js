import React from 'react';
import {Col,Container} from 'reactstrap';
import CourseSearchImproved from './CourseSearchImproved.component';

function ScheduleSelector(){
    return <div>
        <Container fluid={true}>
            <Col sm={6}>
                <CourseSearchImproved/>
            </Col>
        </Container>
    </div>
};

export default ScheduleSelector;