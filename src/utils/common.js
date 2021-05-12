/* Author: Jada Pfeiffer
Purpose: Contains functions that are utilize
by multiple components
*/
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import PanToolIcon from '@material-ui/icons/PanTool';
import FunctionsIcon from '@material-ui/icons/Functions';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import RepeatOneOutlinedIcon from '@material-ui/icons/RepeatOneOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import TransformOutlinedIcon from '@material-ui/icons/TransformOutlined';
import PoolOutlinedIcon from '@material-ui/icons/PoolOutlined';
import {colorPalette} from './design';

export function getRole(r) {
    const role = sessionStorage.getItem('role');
    if (role) role.toLowerCase();
    return (role === r.toLowerCase())
};
export function getUser() {
    return sessionStorage.getItem('user') || null;
};
export function getRoleLiteral() {
    return sessionStorage.getItem('role') || null;
};
export function getLoginStatus() {
    return (sessionStorage.getItem('role')&&sessionStorage.getItem('isVerified')&&sessionStorage.getItem('user'));
};
export function getIsVerified() {
    if (!sessionStorage.getItem('isVerified')) return null;
    if (sessionStorage.getItem('isVerified') === 'false'){
        return false;
    } else return true;
};
export function getIsSurveyed() {
    if (!sessionStorage.getItem('isSurveyed')) return null;
    if (sessionStorage.getItem('isSurveyed') === 'false'){
        return false;
    } else return true;
};

export function logout (){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('isVerified');
    sessionStorage.removeItem('isSurveyed');
    sessionStorage.removeItem('graduationYear');
    sessionStorage.removeItem('studentType');
    sessionStorage.removeItem('major');
    sessionStorage.removeItem('minor');
    sessionStorage.removeItem('graduatepos');
    sessionStorage.removeItem('currPage');
    sessionStorage.removeItem('courseSchedule');
    sessionStorage.removeItem('learningType');
    sessionStorage.removeItem('tabValue');

};
export function login (user,role,isVerified,isSurveyed){
    sessionStorage.setItem('user',JSON.stringify(user));
    sessionStorage.setItem('role',role);
    sessionStorage.setItem('isVerified',isVerified);
    sessionStorage.setItem('isSurveyed',isSurveyed);
};

export function capitalizeFirst(s){
    return s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()
};

export const zeroPad = (num, places) => String(num).padStart(places, '0');

export function storeTabValue(tabValue){
    sessionStorage.setItem('tabValue',tabValue);
};

export function getTabValue(){
    return sessionStorage.getItem('tabValue') || null;
};

export function getMatchColor(percent){
    if (percent > 75) {
        return 'green'
    } else if (percent > 50){
        return '#FFCC00'
    } else {
        return "red"
    }
};

export function getIconLearningType(learningType){
    return (learningType === 'visual') ? <VisibilityIcon style={{color:colorPalette.secondary}}/> :
      (learningType === 'solitary') ? <PersonIcon style={{color:colorPalette.secondary}}/> :
      (learningType === 'social') ? <GroupIcon style={{color:colorPalette.secondary}}/> :
      (learningType === 'verbal') ? <RecordVoiceOverIcon style={{color:colorPalette.secondary}}/> :
      (learningType === "auditory/musical") ? <HearingIcon style={{color:colorPalette.secondary}}/> :
      (learningType === "physical/kinaesthetic") ? <PanToolIcon style={{color:colorPalette.secondary}}/> :
      (learningType === "logical/mathematical") ? <FunctionsIcon style={{color:colorPalette.secondary}}/> :'';  
};

export function getIconIdentifiers(identifier){
    return (identifier === 'first generation') ? <RepeatOneOutlinedIcon style={{color:colorPalette.secondary}}/> :
      (identifier === 'out-of-state') ? <MapOutlinedIcon style={{color:colorPalette.secondary}}/> :
      (identifier === 'international') ? <LanguageOutlinedIcon style={{color:colorPalette.secondary}}/> :
      (identifier === 'first year') ? <SchoolOutlinedIcon style={{color:colorPalette.secondary}}/> :
      (identifier === "greek life") ? <FunctionsIcon style={{color:colorPalette.secondary}}/> :
      (identifier === "athlete") ? <PoolOutlinedIcon style={{color:colorPalette.secondary}}/> :
      (identifier === "transfer") ? <TransformOutlinedIcon style={{color:colorPalette.secondary}}/> :'';  
};


