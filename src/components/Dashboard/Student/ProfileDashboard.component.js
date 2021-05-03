import React, { useState,useEffect } from "react";
import { getUser, capitalizeFirst } from "../../../utils/common";
import {apiUpdateUser,apiGetStudentProfile} from "../../../utils/api";
import avatarUnknown from '../../Profile/Student/unknown-avatar.jpg';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import {colorPalette} from "../../../utils/design";

function ProfileDashboard() {
    const history = useHistory();
    const user = JSON.parse(getUser());
    const [avatar, setAvatar] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(async () => {
        try{
            setLoading(true);
            const data = await apiUpdateUser(user._id,{});
            const profile = await apiGetStudentProfile(user._id);
            setAvatar(data.data.avatar);
            setProfile(profile.data);
            setLoading(false);
        } catch (err){
            setLoading(false);
            setError(true);
            console.log(err);
        }  
      }, 
    []);

    return (
        <div>{(loading) ? <div style={{backgroundColor:'white',zIndex:-1,height:'225px',display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={colorPalette.secondary}/></div>:
            (error) ? <div style={{backgroundColor:'white',zIndex:-1,height:'225px',display:'flex',justifyContent:'center',alignItems: 'center',flexDirection:'column',width:'100%',overflow:'auto'}}><ReactLoading height={'20%'} width={'20%'} type={"cylon"} color={'red'}/><p>Oops... Something Went Wrong</p></div>:
            <Paper style={{overflow:'auto',width:"100%",height:'225px',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}} onClick={()=>history.push('/student-profile')}>
                <div style={{width:'100%'}}>
                    <div style={{display:'flex',alignItems: 'center',justifyContent:'space-around',margin:'auto'}}>
                        {(!avatar)?<img src={avatarUnknown} style={{height: '100px',borderRadius:'50%',margin:'10px'}}/>:
                        <div style={{overflow:'hidden',flexShrink: 0,flexBasis:'100px',flexGrow: 0}}><img src={avatar} style={{height: '100px',margin:'10px'}}/>
                        </div>}
                        <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-end',justifyContent:'flex-end',margin:'10px'}}>
                            <h5 style={{margin:'10px',fontFamily: 'Garamond, serif',fontSize:'25px'}}><strong>{capitalizeFirst(user.first)} {capitalizeFirst(user.last)}</strong></h5>
                            <p style={{margin:'10px',fontFamily: 'Garamond, serif',fontSize:'15px'}}>{user.email}</p>
                            <p style={{margin:'10px',fontFamily: 'Garamond, serif',fontSize:'20px'}}>Class of {profile.graduationYear}</p>
                        </div>
                    </div>
                </div>
            </Paper>}
        </div>
    );
}

export default ProfileDashboard;