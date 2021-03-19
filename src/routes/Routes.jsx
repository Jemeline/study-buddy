import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Protected from "../components/Protected";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Register";
import NewAdmin from "../components/Authentication/NewAdmin";
import RecoverPassword from "../components/Authentication/RecoverPassword";
import StudentDashboard from "../components/Dashboard/StudentDashboard";
import TutorDashboard from "../components/Dashboard/TutorDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => (
    <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/register"><Signup /></Route>
        <Route exact path="/recover"><RecoverPassword /></Route>
        <ProtectedRoute exact path="/protectedroute" component={Protected} />
        <ProtectedRoute claim="student" exact path="/student/dashboard" component={StudentDashboard} />
        <ProtectedRoute claim="tutor" exact path="/tutor/dashboard" component={TutorDashboard} />
        <ProtectedRoute claim="admin" exact path="/admin/dashboard" component={AdminDashboard} />
        <ProtectedRoute claim="admin" exact path="/admin/newAdmin" component={NewAdmin} />
    </Switch>
);

export default Routes;
