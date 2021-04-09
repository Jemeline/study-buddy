import React,{useState,useEffect} from 'react';
import {useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import SecurityIcon from '@material-ui/icons/Security';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserDetails from './UserDetails.component';
import ContactInfo from './ContactInfo.component';
import StudyPreferences from './StudyPreferences.component';
import {getUser,login} from '../../../utils/common';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {apiGetStudentProfile,apiUpdateUser} from '../../../utils/api';

function StudentProfile(){
  const theme = useTheme();
  const scrollableTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {setValue(newValue);};
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
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor='primary'
      variant={scrollableTabs ? "scrollable" : "standard" }
      scrollButtons="on"
      centered={!scrollableTabs}
    >
      <Tab label="User Details" icon={<PersonIcon />} style={{flexShrink: 0}}/>
      <Tab label="Contact Info" icon={<PhoneIcon />} style={{flexShrink: 0}}/>
      <Tab label="Study Preferences" icon={<SchoolIcon />} style={{flexShrink: 0}}/>
      <Tab label="Class Schedule" icon={<ScheduleIcon />} style={{flexShrink: 0}}/>
      <Tab label="Settings" icon={<SettingsIcon />} style={{flexShrink: 0}}/>
      <Tab label="Security" icon={<SecurityIcon />} style={{flexShrink: 0}}/>
    </Tabs>
    <div style={{zIndex:-1,height:'calc(100vh - 160px)',display:'flex',justifyContent:'center',alignItems: 'center'}}>
    {(value === 0) ? <UserDetails user={user} setUser={setUser}/>
    :(value === 1) ? <ContactInfo user={user} setUser={setUser}/>
    :(value === 2) ? <StudyPreferences user={user} setUser={setUser} profile={profile} loading={loading} error={error} setProfile={setProfile}/>
    :(value === 3) ? <p>3</p> // Clayton put your calendar thing here
    :(value === 4) ? <p>4</p>
    :<p>5</p>}
    </div>
</div>
}; 

export default StudentProfile;