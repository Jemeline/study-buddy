import React, {useState} from 'react';
import {colorPalette} from '../../utils/design';
import Paper from '@material-ui/core/Paper';
import logo from '../../components/study-buddy.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function HelpCenter() {
    return <div data-testid='Help-Center' style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'flex-start'}}>
                  
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignContent="space-around"
                    spacing={1}
                    style={{border: "1px solid black", margin: '50px 200px'}}
                >
                    <Grid item xs={12} sm={12} md={12} style={{border: "2px solid black", margin: "10px"}}>
                        <h4>UNC has plenty of resources for struggling students! Look below to find out more</h4>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{margin: "10px"}}>
                        <img src="https://pbs.twimg.com/media/EhEOEPFXYAAIGHd.png" alt="Confused face" width="200px" height="200px"></img>
                    </Grid>
                    <Grid item xs={3} sm={6} md={3} style={{border: "2px solid black", margin: "10px"}}>
                        <h6 >UNC Learning Center</h6>
                        <a href="https://learningcenter.unc.edu/">Go to Learning Center</a>
                    </Grid>
                    <Grid item xs={3} sm={6} md={3} style={{border: "2px solid black", margin: "10px"}}>
                        <h6 >UNC Writing Center</h6>
                        <a href="https://writingcenter.unc.edu/">Go to Writing Center</a>

                    </Grid>
                    <Grid item xs={3} sm={6} md={3} style={{border: "2px solid black", margin: "10px"}}>
                        <h6>Find a Tutor</h6>
                        <a href="/find-tutors">Search for a tutor</a>
                    </Grid>
                </Grid>
            </div>
}

export default HelpCenter;