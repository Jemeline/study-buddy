/* Author: Jada Pfeiffer
Purpose: Top level component for admin profile
Route: https://study-buddy-d452c.web.app/admin-profile
*/
import React,{useState,useEffect} from 'react';
import Profile from './Profile.component';
import {getUser} from '../../../utils/common';
import {getUsers} from '../../../utils/api';

function AdminProfile(){
    const [user,setUser] = useState(JSON.parse(getUser()));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(async () => {
        try{
          setLoading(true);
          setError(false);
          const data = await getUsers();
          if (data.data != null) {
            setProfile(data.data.filter(e=>e._id===user._id));
            setLoading(false);
          } else {
            setError(true);
          }  
        } catch (err){
          setError(true);
          setLoading(false);
        }  
      }, [])
    
    return <div>
        <Profile hidden={false} user={user} setUser={setUser} loading={loading} />
    </div>
}; 

export default AdminProfile;