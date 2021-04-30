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
        <div style={{width:"100%"}}>
            <Paper style={{overflow:'auto',maxHeight:'30vh',height:'30vh',margin:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div style={{width:'100%'}}>
                <div style={{display:'flex',alignItems: 'center',justifyContent:'space-between',margin:'auto'}}>
                    {(!avatar)?<img src={avatarUnknown} style={{height: '150px',width:"150px",borderRadius:'50%',margin:'10px'}}/>:
                    <div style={{overflow:'hidden',flexShrink: 0,flexBasis:'150px',flexGrow: 0}}><img src={avatar} style={{height: '150px',margin:'10px'}}/>
                    </div>}
                    <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-end',justifyContent:'flex-end',margin:'10px'}}>
                        <h5 style={{margin:'10px'}}>{capitalizeFirst(user.first)} {capitalizeFirst(user.last)}</h5>
                        <p style={{margin:'10px'}}>{user.email}</p>
                        <p style={{margin:'10px'}}>Class of {profile.graduationYear}</p>
                    </div>
                </div>
                </div>
            </Paper>
        </div>
        // <div style={{width:"100%"}}>
        //     <Paper style={{overflow:'auto',maxHeight:'30vh',height:'30vh',margin:'auto',cursor:'pointer',alignItems:'center'}} onClick={()=> history.push('/student-profile')}>
                // <div style={{display:'flex',alignItems: 'center',justifyContent:'space-between',margin:'auto'}}>
                //     {(!avatar)?<img src={avatarUnknown} style={{height: '150px',width:"150px",borderRadius:'50%',margin:'q0px'}}/>:
                //     <div style={{overflow:'hidden',flexShrink: 0,flexBasis:'150px',flexGrow: 0}}><img src={avatar} style={{height: '150px',margin:'10px'}}/>
                //     </div>}
                //     <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-end',justifyContent:'flex-end',margin:'10px'}}>
                //         <h5 style={{margin:'10px'}}>{capitalizeFirst(user.first)} {capitalizeFirst(user.last)}</h5>
                //         <p style={{margin:'10px'}}>{user.email}</p>
                //         <p style={{margin:'10px'}}>Class of {profile.graduationYear}</p>
                //     </div>
                // </div>
        //     </Paper>
        // </div>
    );
}

export default ProfileDashboard;