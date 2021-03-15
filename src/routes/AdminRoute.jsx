import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Redirect } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";

// User must be logged in and an admin to access AdminRoute
const AdminRoute = ({ Firebase, path, component: Component }) => (
    Firebase.getClaims().admin 
        ? <ProtectedRoute exact path={path} component={Component} />
        : <Redirect to="/login" />
);

export default withFirebase(AdminRoute);