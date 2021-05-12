/* Author: Jada Pfeiffer
Purpose: Main routing for App
Utilizes Route wrappers to protect routes based on
login status and user role
*/
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import StudentDashboard from '../components/Dashboard/StudentDashboard.component';
import TutorDashboard from '../components/Dashboard/TutorDashboard.component';
import AdminDashboard from '../components/Dashboard/Admin/AdminDashboard.component';
import Home from '../components/Home.component';
import AuthenticationHome from '../components/Authentication/AuthenticationHome.component';
import Survey from '../components/Survey/Student/Survey.component';
import StudentProfile from '../components/Profile/Student/StudentProfile.component';
import StudentRoute from './RouteClasses/Student.route';
import TutorRoute from './RouteClasses/Tutor.route';
import AdminRoute from './RouteClasses/Admin.route';
import AdminProfile from '../components/Profile/Admin/AdminProfile.component';
import HelpCenter from '../components/Help/HelpCenter.component';
import StudentFindTutors from "../components/Advertisements/StudentFindTutors";
import StudentUserList from '../components/Dashboard/Student/StudentUserList.component';
import StudentMatchList from '../components/Dashboard/Student/StudentMatchList.component';
import InviteLink from '../components/InviteLink/InviteLink.component'
import MassStudyInvite from '../components/MassInvite/MassInvite.component';
import CreateAd from '../components/Advertisements/CreateAd';
import TutorProfile from '../components/Profile/Tutor/TutorProfile.component';
import ContactUs from '../components/Contact/ContactUs.component';

const Routes = ({setIsLoggedIn}) => (
    <Switch>
      <Route exact path="/" render={() => (<Home/>)}/>
      <Route exact path="/auth/" render={() => (<AuthenticationHome  setIsLoggedIn={setIsLoggedIn}/>)}/>
      <Route exact path="/contact" render={() => (<ContactUs />)} />
      <StudentRoute exact path="/dashboard/student" component={StudentDashboard}/>
      <StudentRoute exact path="/student-survey" component={Survey}/>
      <StudentRoute exact path="/student-profile" component={StudentProfile}/>
      <StudentRoute exact path="/student-help" component={HelpCenter}/>
      <StudentRoute exact path="/mass-study-invite" component={MassStudyInvite}/>
      <StudentRoute exact path="/find-tutors" component={StudentFindTutors}/>
      <StudentRoute exact path="/find-students" component={StudentUserList}/>
      <StudentRoute exact path="/match" component={StudentMatchList}/>
      <TutorRoute exact path="/dashboard/tutor" component={TutorDashboard}/>
      <TutorRoute exact path="/tutor-profile" component={TutorProfile}/>
      <TutorRoute exact path="/create-ad" component={CreateAd}/>
      <AdminRoute exact path="/dashboard/admin" component={AdminDashboard}/>
      <AdminRoute exact path="/admin-profile" component={AdminProfile}/>  
      <Route exact path="/invitelink" render={() => (<InviteLink/>)}/>
    </Switch>
  );
  
  export default Routes;