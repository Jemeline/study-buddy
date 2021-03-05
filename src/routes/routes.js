import React from 'react';
import {Switch} from 'react-router-dom';
import StudentDashboard from '../components/StudentDashboard.component';
import TutorDashboard from '../components/TutorDashboard.component';
import AdminDashboard from '../components/AdminDashboard.component';
import Login from '../components/Login.component';
import Register from '../components/Register.component';
import RecoverPassword from '../components/RecoverPassword.component';
import VerifyAccount from '../components/VerifyAccount.component';
import IncorrectEmail from '../components/IncorrectEmail.component';
import StudentRoute from './Student.route';
import TutorRoute from './Tutor.route';
import AdminRoute from './Admin.route';
import PublicRoute from './Public.route';
import UnverifiedRoute from './Unverified.route';

const Routes = () => (
    <Switch>
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/register" component={Register} />
      <PublicRoute exact path="/recover" component={RecoverPassword} />
      <UnverifiedRoute exact path="/verify" component={VerifyAccount} />
      <UnverifiedRoute exact path="/incorrect-email" component={IncorrectEmail} />
      <StudentRoute exact path="/dashboard/student" component={StudentDashboard} />
      <TutorRoute exact path="/dashboard/tutor" component={TutorDashboard} />
      <AdminRoute exact path="/dashboard/admin" component={AdminDashboard} />
    </Switch>
  );
  
  export default Routes;