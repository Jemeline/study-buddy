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
import StudentProfile from '../components/Profile/Student/Profile.component';
import IncorrectEmail from '../components/Authentication/IncorrectEmail.component';
import StudentRoute from './RouteClasses/Student.route';
import TutorRoute from './RouteClasses/Tutor.route';
import AdminRoute from './RouteClasses/Admin.route';
import UnverifiedRoute from './RouteClasses/Unverified.route';

const Routes = ({setIsLoggedIn,setIsHome}) => (
    <Switch>
      <Route exact path="/" render={() => (<Home  setIsLoggedIn={setIsLoggedIn} setIsHome={setIsHome}/>)}/>
      <Route exact path="/auth/" render={() => (<AuthenticationHome  setIsLoggedIn={setIsLoggedIn} setIsHome={setIsHome}/>)}/>
      <Route exact path="/recover" component={RecoverPassword}/>
      <Route exact path='/verify' render={() => (<VerifyAccount setIsLoggedIn={setIsLoggedIn}/>)}/>
      <UnverifiedRoute exact path="/incorrect-email" component={IncorrectEmail} setIsHome={setIsHome}/>
      <StudentRoute exact path="/dashboard/student" component={StudentDashboard} setIsHome={setIsHome}/>
      <StudentRoute exact path="/student-survey" component={Survey} setIsHome={setIsHome}/>
      <StudentRoute exact path="/student-profile" component={StudentProfile} setIsHome={setIsHome}/>
      <TutorRoute exact path="/dashboard/tutor" component={TutorDashboard} setIsHome={setIsHome}/>
      <AdminRoute exact path="/dashboard/admin" component={AdminDashboard} setIsHome={setIsHome}/>
      
    </Switch>
  );
  
  export default Routes;