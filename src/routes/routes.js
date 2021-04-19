import React from 'react';
import {Switch,Route} from 'react-router-dom';
import StudentDashboard from '../components/Dashboard/StudentDashboard.component';
import TutorDashboard from '../components/Dashboard/TutorDashboard.component';
import AdminDashboard from '../components/Dashboard/AdminDashboard.component';
import Home from '../components/Home.component';
import AuthenticationHome from '../components/Authentication/AuthenticationHome.component';
import RecoverPassword from '../components/Authentication/RecoverPassword.component';
import VerifyAccount from '../components/Authentication/VerifyAccount.component';
import Survey from '../components/Survey/Student/Survey.component';
import StudentProfile from '../components/Profile/Student/StudentProfile.component';
import IncorrectEmail from '../components/Authentication/IncorrectEmail.component';
import StudentRoute from './RouteClasses/Student.route';
import TutorRoute from './RouteClasses/Tutor.route';
import AdminRoute from './RouteClasses/Admin.route';
import UnverifiedRoute from './RouteClasses/Unverified.route';
import HelpCenter from '../components/Help/HelpCenter.component';

const Routes = ({setIsLoggedIn}) => (
    <Switch>
      <Route exact path="/" render={() => (<Home/>)}/>
      <Route exact path="/auth/" render={() => (<AuthenticationHome  setIsLoggedIn={setIsLoggedIn}/>)}/>
      <StudentRoute exact path="/dashboard/student" component={StudentDashboard}/>
      <StudentRoute exact path="/student-survey" component={Survey}/>
      <StudentRoute exact path="/student-profile" component={StudentProfile}/>
      <StudentRoute exact path="/student-help" component={HelpCenter}/>
      <TutorRoute exact path="/dashboard/tutor" component={TutorDashboard}/>
      <AdminRoute exact path="/dashboard/admin" component={AdminDashboard}/>  
    </Switch>
  );
  
  export default Routes;