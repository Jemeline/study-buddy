import React from "react";
import { Row, Col } from "react-bootstrap";
import TutorAd from "./TutorAd";
import Grid from '@material-ui/core/Grid';

// List of Tutor Advertisements
// list: [ {"_id": 0, 
//     "tutorEmail": "tutor@email.com", 
//     "text": "ad text", 
//     "courses": "COMP-523, COMP-110"} ]
const TutorAdList = ({ isTutor, list }) => {
    return <div style={{flexGrow: 1,height:'calc(100vh - 85px)',overflowY:'auto',overflowX:'hidden', margin:'10px'}}>
    <Grid
        container
        direction="row"
        justify="flex-start"
        spacing={1}
    >
    {list.map(item => 
        <Grid item xs={12} sm={6} md={3} >
            <TutorAd isTutor={isTutor} ad={item}></TutorAd>
        </Grid>
        // <Row key={item._id}><Col>
        //     <TutorAd isTutor={isTutor} ad={item} />
        // </Col></Row>
    )}
    </Grid>
    </div>
};

export default TutorAdList;
