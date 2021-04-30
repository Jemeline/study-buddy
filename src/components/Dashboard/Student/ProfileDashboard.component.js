import React, { useState,useEffect } from "react";
import { getUser, capitalizeFirst } from "../../../utils/common";
import {apiUpdateUser,apiGetStudentProfile} from "../../../utils/api";
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

function ProfileDashboard() {
    const history = useHistory();
    const user = JSON.parse(getUser());
    const [avatar, setAvatar] = useState('');
    const [profile, setProfile] = useState({});
    
    useEffect(async () => {
        try{
            const data = await apiUpdateUser(user._id,{});
            const profile = await apiGetStudentProfile(user._id);
            setAvatar(data.data.avatar);
            setProfile(profile.data);
        } catch (err){
          console.log(err);
        }  
      }, 
    []);

    return (
        <Paper style={{overflow:'auto',width:"100%",height:'225px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}} onClick={()=>history.push('/student-profile')}>
            <div style={{width:'100%'}}>
                <div style={{display:'flex',alignItems: 'center',justifyContent:'space-between',margin:'auto'}}>
                    {(!avatar)?<img src={avatarUnknown} style={{height: '150px',width:"150px",borderRadius:'50%',margin:'10px'}}/>:
                    <div style={{overflow:'hidden',flexShrink: 0,flexBasis:'150px',flexGrow: 0}}><img src={avatar} style={{height: '150px',margin:'10px'}}/>
                    </div>}
                    <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-end',justifyContent:'flex-end',margin:'10px'}}>
                        <h5 style={{margin:'10px',fontFamily: 'Garamond, serif',fontSize:'25px'}}><strong>{capitalizeFirst(user.first)} {capitalizeFirst(user.last)}</strong></h5>
                        <p style={{margin:'10px',fontFamily: 'Garamond, serif',fontSize:'20px'}}>{user.email}</p>
                        <p style={{margin:'10px',fontFamily: 'Garamond, serif',fontSize:'20px'}}>Class of {profile.graduationYear}</p>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default ProfileDashboard;