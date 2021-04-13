import React from 'react';
import {Switch,Route} from 'react-router-dom';
import StudentDashboard from '../components/Dashboard/StudentDashboard.component';
import TutorDashboard from '../components/Dashboard/TutorDashboard.component';
import AdminDashboard from '../components/Dashboard/AdminDashboard.component';
import Login from '../components/Authentication/Login.component';
import Home from '../components/Home.component';
import Register from '../components/Authentication/Register.component';
import RecoverPassword from '../components/Authentication/RecoverPassword.component';
import VerifyAccount from '../components/Authentication/VerifyAccount.component';
import Survey from '../components/Survey/Student/Survey.component';
import StudentProfile from '../components/Profile/Student/Profile.component';
import IncorrectEmail from '../components/Authentication/IncorrectEmail.component';
import StudentRoute from './RouteClasses/Student.route';
import TutorRoute from './RouteClasses/Tutor.route';
import AdminRoute from './RouteClasses/Admin.route';
import UnverifiedRoute from './RouteClasses/Unverified.route';

const Routes = ({setIsLoggedIn}) => (
    <Switch>
      <Route path='/register' render={() => (<Register  setIsLoggedIn={setIsLoggedIn}/>)}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/recover" component={RecoverPassword}/>
      <Route path='/login' render={() => (<Login  setIsLoggedIn={setIsLoggedIn}/>)}/>
      <UnverifiedRoute exact path='/verify' component={VerifyAccount} />
      <UnverifiedRoute exact path="/incorrect-email" component={IncorrectEmail}/>
      <StudentRoute exact path="/dashboard/student" component={StudentDashboard}/>
      <StudentRoute exact path="/student-survey" component={Survey}/>
      <StudentRoute exact path="/student-profile" component={StudentProfile}/>
      <TutorRoute exact path="/dashboard/tutor" component={TutorDashboard}/>
      <AdminRoute exact path="/dashboard/admin" component={AdminDashboard}/>
      
    </Switch>
  );
  
  export default Routes;