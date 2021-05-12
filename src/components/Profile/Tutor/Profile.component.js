/* Author: Jada Pfeiffer
Purpose: main tutor profile component utilizes MUI tabs
Route: https://study-buddy-d452c.web.app/tutor-profile
*/
import React,{useState} from 'react';
import {useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserDetails from '../Student/UserDetails.component';
import ContactInfo from '../Student/ContactInfo.component';
import TutorRating from '../Tutor/TutorRating.component';
import Settings from '../Student/Settings.component';
import StarHalfIcon from '@material-ui/icons/StarHalf';

function Profile({hidden,user,setUser,loading,error,profile,setProfile}){
  const theme = useTheme();
  const scrollableTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
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
    >
      <Tab label="User Details" icon={<PersonIcon />} style={{flexShrink: 0}}/>
      <Tab label="Contact Info" icon={<PhoneIcon />} style={{flexShrink: 0}}/>
      <Tab label="Rating" icon={<StarHalfIcon />} style={{flexShrink: 0}}/>
      <Tab label="Settings" icon={<SettingsIcon />} style={{flexShrink: 0}} hidden={hidden}/>
    </Tabs>
    <div style={{zIndex:-1,height:'calc(100vh - 160px)',display:'flex',justifyContent:'center',alignItems: 'center'}}>
    {(value === 0) ? <UserDetails user={user} setUser={setUser} hidden={hidden} loading={loading}/>
    :(value === 1) ? <ContactInfo user={user} setUser={setUser} hidden={hidden}/>
    :(value === 2) ? <TutorRating user={user} setUser={setUser} hidden={hidden}/>
    :(value === 3) ? <Settings user={user} setUser={setUser} hidden={hidden}/>
    :<p>3</p>}
    </div>
</div>
}; 

export default Profile;