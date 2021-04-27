import React,{useState} from 'react';
import {useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserDetails from './UserDetails.component';
import ContactInfo from './ContactInfo.component';
import StudentUnsurveyed from './StudentUnsurveyed.component';
import StudyPreferences from './StudyPreferences.component';
import Favorites from './Favorites.component';
import Settings from './Settings.component';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DashboardUnsurveyed from '../../Dashboard/DashboardUnsurveyed.component';
import Calendar from '../../Calendar/Calendar.component'

function Profile({hidden,user,setUser,surveyed,loading,error,profile,setProfile}){
  const theme = useTheme();
  const scrollableTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const [hideProfileTabs, setHideProfileTabs] = useState(false);
  const handleChange = (event, newValue) => {setValue(newValue);};

  return <div>
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor='primary'
      variant={scrollableTabs ? "scrollable" : "standard" }
      scrollButtons="on"
      centered={!scrollableTabs}
      hidden={hideProfileTabs}
    >
      <Tab label="User Details" icon={<PersonIcon />} style={{flexShrink: 0}}/>
      <Tab label="Contact Info" icon={<PhoneIcon />} style={{flexShrink: 0}}/>
      <Tab label="Study Preferences" icon={<SchoolIcon />} style={{flexShrink: 0}}/>
      <Tab label="Class Schedule" icon={<ScheduleIcon />} style={{flexShrink: 0}}/>
      <Tab label="Favorites" icon={<ThumbUpIcon />} style={{flexShrink: 0}}/>
      <Tab label="Settings" icon={<SettingsIcon />} style={{flexShrink: 0}} hidden={hidden}/>
    </Tabs>
    <div style={{zIndex:-1,height:'calc(100vh - 160px)',display:'flex',justifyContent:'center',alignItems: 'center'}}>
    {(value === 0) ? <UserDetails user={user} setUser={setUser} hidden={hidden} loading={loading}/>
    :(value === 1) ? <ContactInfo user={user} setUser={setUser} hidden={hidden}/>
    :(value === 2) ? ((surveyed) ? <StudyPreferences user={user} setUser={setUser} hidden={hidden} profile={profile} loading={loading} error={error} setProfile={setProfile}/> 
      : (!hidden) ? <DashboardUnsurveyed/> : <StudentUnsurveyed/>)
    :(value === 3) ? <Calendar user={user}/>
    :(value === 4) ? <Favorites setHideProfileTabs={setHideProfileTabs}/>
    :(value === 5) ? <Settings user={user} setUser={setUser} hidden={hidden}/>
    :<p>6</p>}
    </div>
</div>
}; 

export default Profile;