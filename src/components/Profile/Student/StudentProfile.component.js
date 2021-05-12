/* Author: Jada Pfeiffer
Purpose: Top level component for student profile
Fetches StudentProfile of logged-in user and sends to Profile
Route: https://study-buddy-d452c.web.app/student-profile
*/
import React,{useState,useEffect} from 'react';
import Profile from './Profile.component';
import {getUser} from '../../../utils/common';
import {apiGetStudentProfile} from '../../../utils/api';

function StudentProfile(){
    const [user,setUser] = useState(JSON.parse(getUser()));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(async () => {
        try{
          setLoading(true);
          setError(false);
          const data = await apiGetStudentProfile(user._id);
          if (data.data != null) {
            setProfile(data.data);
            setLoading(false);
          } else {
            setError(true);
          }  
        } catch (err){
          setError(true);
        }  
      }, [])
    
    return <div>
        <Profile hidden={false} user={user} setUser={setUser} surveyed={user.isSurveyed} loading={loading} error={error} profile={profile} setProfile={setProfile}/>
    </div>
}; 

export default StudentProfile;