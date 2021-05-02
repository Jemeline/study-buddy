import React, { useState,useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { colorPalette } from '../../../utils/design';
import { getUser,capitalizeFirst } from '../../../utils/common';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReactLoading from "react-loading";
import {apiGetStudents,apiGetStudentProfile,apiGetStudentProfiles} from '../../../utils/api';
import {getWeightedSum} from '../../Survey/MatchingAlgorithm';

function HighestMatchDashboard() {
    const [user, setUser] = useState(JSON.parse(getUser()));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userMatches, setUserMatches] = useState(getMatches());
    const [highestMatch,setHighestMatch] = useState({});
    const [highestMatchProfile,setHighestMatchProfile] = useState({});
    const [userProfile,setUserProfile] = useState({});
    const [highestMatchStats,setHighestMatchStats] = useState({});

    async function getMatches() {
        const user = JSON.parse(getUser());
        const profile = (await apiGetStudentProfile(user._id)).data;
        const matches = await getWeightedSum(profile);
        return matches;
    };

    useEffect(async () => {
        try {
            setLoading(true);
            setError(false);
            const students = (await apiGetStudents()).data;
            const studentProfiles = (await apiGetStudentProfiles()).data;
            const awaitedUserMatches = await userMatches;
            const orderedStudents = awaitedUserMatches.map(match => students.find(student => student._id === studentProfiles.find(profile => profile._id === match["id"])._userId));
            const highestMatch = await orderedStudents[0];
            const highestMatchProfile = await studentProfiles.find(e=> highestMatch._id===e._userId);
            const userProfile = await studentProfiles.find(e=> user._id===e._userId);
            const highestMatchStats = awaitedUserMatches[0];
            setHighestMatch({email:highestMatch.email,name:capitalizeFirst(highestMatch.first)+' '+capitalizeFirst(highestMatch.last),percent:highestMatchStats.percentMatch,avatar:highestMatch.avatar,sharedClasses:highestMatchStats.sharedClasses.join(', ')});
            setUserProfile(userProfile);
            setHighestMatchStats(highestMatchStats);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
            console.log(err);
        }
    }, []);



    return (
        <div>{(loading) ? <div style={{backgroundColor:'white',zIndex:-1,height:'225px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
        (error) ? <div style={{backgroundColor:'white',zIndex:-1,height:'225px',display:'flex',justifyContent:'center',alignItems: 'center',flexDirection:'column',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={'red'}/><p>Oops... Something Went Wrong</p></div>:
            <Paper style={{overflow:'auto',height:'225px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <div style={{height:'225px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                    <h5 style={{fontSize:'20px',fontFamily: 'Garamond, serif',margin:'3px'}}><strong>My Closest Match</strong></h5>
                    <div style={{borderRadius:'50%',height: '40px',width:"40px",backgroundImage:`url(${highestMatch.avatar})`,backgroundSize:'cover',backgroundPosition:'center',margin:'3px'}}/>
                    <p style={{margin:'2px'}}>{highestMatch.name}</p>
                    <p style={{margin:'2px',fontSize:'12px'}}><em>{highestMatch.email}</em></p>
                    <p style={{marginTop:'2px',marginBottom:'0px',fontSize:'12px'}}><strong>You are both taking: {highestMatch.sharedClasses}</strong></p>
                    <h5 style={{fontSize:'20px',margin:'3px'}}><span style={{color:getMatchColor(highestMatch.percent)}}>{highestMatch.percent}%</span> Match</h5>
                </div>
            </Paper>}
        </div>
    );
}

function getMatchColor(percent){
    if (percent > 75) {
        return 'green'
    } else if (percent > 50){
        return '#FFCC00'
    } else {
        return "red"
    }
};

export default HighestMatchDashboard;