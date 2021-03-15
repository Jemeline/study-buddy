import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Redirect } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";

// User must be logged in and a student to access StudentRoute
const StudentRoute = ({ Firebase, path, component: Component }) => (
    Firebase.getClaims().student 
        ? <ProtectedRoute exact path={path} component={Component} />
        : <Redirect to="/login" />
);

export default withFirebase(StudentRoute);
