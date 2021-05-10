// Written by Sai Gongidi
// Grid view of Tutor Advertisements
// list: [ {advertisement} ]

import React from "react";
import TutorAd from "./TutorAd";
import Grid from '@material-ui/core/Grid';

const TutorAdList = ({ isTutor, list }) => {
    return <div style={{flexGrow: 1,height:'calc(100vh - 85px)',overflowY:'auto',overflowX:'hidden', margin:'10px'}}>
        <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={3}
        >
            {list.map(ad => 
                <Grid key={ad._id} item xs={4} sm={4} md={4} >
                    <TutorAd isTutor={isTutor} ad={ad}></TutorAd>
                </Grid>
            )}
        </Grid>
    </div>
};

export default TutorAdList;
