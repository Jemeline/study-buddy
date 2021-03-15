import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Protected from "../components/Protected";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import RecoverPassword from "../components/Authentication/RecoverPassword";
import StudentDashboard from "../components/Dashboard/StudentDashboard";
import TutorDashboard from "../components/Dashboard/TutorDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/recover" component={RecoverPassword} />
        <ProtectedRoute exact path="/protectedroute" component={Protected} />
        <StudentRoute path="/student/dashboard" component={StudentDashboard} />
        <TutorRoute path="/tutor/dashboard" component={TutorDashboard} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
    </Switch>
);

export default Routes;
