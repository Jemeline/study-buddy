import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Redirect } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";

// User must be logged in and a tutor to access TutorRoute
const TutorRoute = ({ Firebase, path, component: Component }) => (
    Firebase.getClaims().tutor 
        ? <ProtectedRoute exact path={path} component={Component} />
        : <Redirect to="/login" />
);

export default withFirebase(TutorRoute);