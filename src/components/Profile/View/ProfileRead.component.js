/* Author: Jada Pfeiffer
Purpose: Main component for authenticated student to view other
students' profiles
Read-only version of ../Student/StudentProfile
Route: https://study-buddy-d452c.web.app/find-students
*/
import React,{useState} from 'react';
import {useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserDetailsRead from './UserDetailsRead.component';
import ContactInfoRead from './ContactInfoRead.component';
import StudentUnsurveyed from '../Student/StudentUnsurveyed.component';
import StudyPreferencesRead from './StudyPreferencesRead.component';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UndoIcon from '@material-ui/icons/Undo';
import CalendarRead from '../../Calendar/CalendarRead.component'

function ProfileRead({user,profile,setHiddenProfile,setHiddenTable,setHideProfileTabs,hideProfileTabs}){
  const theme = useTheme();
  const scrollableTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(1);
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
      <Tab label="Back" onClick={() => {setHiddenTable(false);setHiddenProfile(true);setValue(1);if(hideProfileTabs)setHideProfileTabs(false);}} icon={<UndoIcon />} style={{flexShrink: 0}}/>
      <Tab label="User Details" icon={<PersonIcon />} style={{flexShrink: 0}}/>
      <Tab label="Contact Info" icon={<PhoneIcon />} style={{flexShrink: 0}}/>
      <Tab label="Study Preferences" icon={<SchoolIcon />} style={{flexShrink: 0}}/>
      <Tab label="Class Schedule" icon={<ScheduleIcon />} style={{flexShrink: 0}}/>
    </Tabs>
    <div style={{zIndex:-1,height:'calc(100vh - 160px)',display:'flex',justifyContent:'center',alignItems: 'center'}}>
    {(value === 1) ? <UserDetailsRead user={user}/>
    :(value === 2) ? <ContactInfoRead user={user}/>
    :(value === 3) ? ((user.isSurveyed) ? <StudyPreferencesRead profile={profile}/> : <StudentUnsurveyed/>)
    :(value === 4) ? <CalendarRead user={user}/>
    :<p>3</p>}
    </div>
</div>
}; 

export default ProfileRead;