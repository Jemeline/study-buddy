import React, {useState} from 'react';
import {colorPalette} from '../../utils/design';
import Paper from '@material-ui/core/Paper';
import logo from '../../components/study-buddy.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function HelpCenter() {
    return <div style={{backgroundColor:colorPalette.gray,zIndex:-1, height:'calc(100vh - 65px)', display:'flex', justifyContent:'center', alignItems: "center", boxSizing: "border-box"}}>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <img src={logo} alt="logo" style={{height: "60vh", width: "30vw"}}/>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Paper elevation={5} style={{overflow: "scroll", width: "33vw", height: "calc(45vh - 65px)", margin: "5%", display: "flex", flexDirection: "column"}}>
                        <div style={{backgroundColor: colorPalette.gray, height: "25%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <h5 style={{fontFamily: "garamond, serif"}}><strong>Learning Center</strong></h5>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <p style={{alignSelf: "flex-start"}}>Struggle no more! The <a target="_blank" rel="noreferrer" href="https://learningcenter.unc.edu/">UNC learning center</a> has the resources you are looking for to succeed at Carolina! Find a tutor or study group, prep for a big test, improve time management, and more!</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", height: "20%", width: "20%"}}>
                            <a target="_blank" rel="noreferrer" style={{color: colorPalette.secondaryA}} href='https://learningcenter.unc.edu/'><ArrowForwardIcon></ArrowForwardIcon></a>
                        </div>
                    </Paper>
                    <Paper elevation={5} style={{overflow: "scroll", width: "33vw", height: "calc(45vh - 65px)", margin: "5%", display: "flex", flexDirection: "column"}}>
                        <div style={{backgroundColor: colorPalette.gray, height: "25%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <h5 style={{fontFamily: "garamond, serif"}}><strong>Writing Center</strong></h5>
                        </div>
                        <div>
                            <p>Writing is tough! Need help? Check out the <a target="_blank" rel="noreferrer" href="https://writingcenter.unc.edu/">UNC writing center</a>, and learn how to write more effective and concise papers.</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", height: "20%", width: "20%"}}>
                            <a target="_blank" rel="noreferrer" style={{color: colorPalette.secondaryA}} href='https://writingcenter.unc.edu/'><ArrowForwardIcon></ArrowForwardIcon></a>
                        </div>
                    </Paper>
                </div>
            </div>
}

export default HelpCenter;