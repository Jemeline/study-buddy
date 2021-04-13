import React from 'react';
import {colorPalette} from '../../../utils/design';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {storeCurrPage} from './utils/common';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {apiCreateStudentProfile,apiResubmitStudentProfile} from '../../../utils/api';
import {getIsSurveyed, getUser} from '../../../utils/common';
import { useHistory } from "react-router-dom";
import {getWeightedSum} from "../MatchingAlgorithm";
import {StudentDashboard} from "../../Dashboard/StudentDashboard.component"
import axios from 'axios';


function SurveyNavigation({major,setCurrPage,currPage,pageStart,pageEnd,courseSchedule,profilePayload,graduatePOS,studentType}){ 
    const history = useHistory();
    const user = JSON.parse(getUser());

    return <div style={{display: 'flex',justifyContent: "space-between",height:'6vh',marginTop:'1vh',marginTop:'1vh'}}>
        <Button
            variant="contained"
            style={{width:'12vw',fontSize:'1vw',backgroundColor:colorPalette.secondary,color:colorPalette.white}}
            startIcon={<ArrowBackIcon />}
            onClick={()=> {
                if (currPage === pageStart){
                    history.push(`/dashboard/${user.role}`);
                } else if (currPage === 6){
                    setCurrPage(currPage-2);
                    storeCurrPage(currPage-2);
                } else {
                    setCurrPage(currPage-1);
                    storeCurrPage(currPage-1);
                }
            }}
            hidden={currPage > pageEnd+1}
        >Back
        </Button>
        <Button
            variant="contained"
            style={{width:'12vw',fontSize:'1vw',backgroundColor:getButtonColor(((major.length===0  && studentType === 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 3)),colorPalette),
                color:colorPalette.white}}
            endIcon={<ArrowForwardIcon />}
            onClick={()=> {setCurrPage(currPage+1);storeCurrPage(currPage+1);}}
            disabled={(major.length===0  && studentType=== 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 4)}
            hidden={(currPage >= pageEnd-1)}
        >Next
        </Button>
        <Button
            variant="contained"
            style={{width:'12vw',fontSize:'1vw',backgroundColor:getButtonColor(((major.length===0  && studentType=== 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 3)),colorPalette),color:colorPalette.white}}
            endIcon={<CheckCircleOutlineIcon />}
            onClick={async()=> {
                await handleSurveySubmit(profilePayload(),setCurrPage,storeCurrPage);
            }}
            disabled={(major.length===0  && studentType=== 'undergraduate' && currPage === 2) || (graduatePOS.length===0  && studentType=== 'graduate' && currPage === 2)|| (currPage === pageEnd) || (courseSchedule.length === 0 && currPage === 4)}
            hidden={!(currPage === pageEnd-1)}
        >Finish
        </Button>
        <Button
            variant="contained"
            style={{width:'12vw',backgroundColor:colorPalette.secondary,color:colorPalette.white,fontSize:'1vw'}}
            onClick={async()=> {
                await handleSurveyResubmit(profilePayload(),setCurrPage,storeCurrPage);
            }}
            hidden={currPage !==5}
        >Yes, Resubmit
        </Button>
    </div>
};

async function handleSurveySubmit(payload,setCurrPage,storeCurrPage){
    try {
        if (getIsSurveyed()){
            setCurrPage(5);
            storeCurrPage(5);
        } else {
            const data = await apiCreateStudentProfile(payload);
            sessionStorage.setItem('isSurveyed',true);

            // Retrieve profile of logged in user
            const user = JSON.parse(getUser());
            const getUserProfiles = await axios({
                method: 'get',
                url: `https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/student-profile`
            });
            const users = getUserProfiles.data;
            let userProfileId = 0;
            for (let i = 0; i < users.length; i++) {
                if (users[i]._userId == user._id) {
                    userProfileId = users[i]._id;
                    break;
                }
            }
            const getUserProfile = await axios({
                method: 'get',
                url: `https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/student-profile/find-by-id/${userProfileId}`
            });
            const userProfile = getUserProfile.data;

            // Use algorithm to sort other users
            const sums = await getWeightedSum(userProfile);
            console.log(sums);
           
            setCurrPage(6);
            storeCurrPage(6);
        }
    } catch (error){
        console.log(error);
    };
};

async function handleSurveyResubmit(payload,setCurrPage,storeCurrPage){
    try {
        const data = await apiResubmitStudentProfile(payload);

        // Retrieve profile of logged in user
        const user = JSON.parse(getUser());
        const getUserProfiles = await axios({
            method: 'get',
            url: `https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/student-profile`
        });
        const users = getUserProfiles.data;
        let userProfileId = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i]._userId == user._id) {
                userProfileId = users[i]._id;
                break;
            }
        }
        const getUserProfile = await axios({
            method: 'get',
            url: `https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/student-profile/find-by-id/${userProfileId}`
        });
        const userProfile = getUserProfile.data;

        // Use algorithm to sort other users
        const sums = await getWeightedSum(userProfile);
        console.log(sums);

        setCurrPage(6);
        storeCurrPage(6);
    } catch (error){
        console.log(error);
    };
};

function getButtonColor(disabled,colorPalette) {
    if (disabled) return colorPalette.darkGray;
    return colorPalette.secondary;
};

export default SurveyNavigation;