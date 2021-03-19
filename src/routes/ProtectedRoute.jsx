import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";
import ClaimRoute from "./ClaimRoute";

// User must be logged in to access ProtectedRoute
const ProtectedRoute = ({ Firebase, claim, component: Component, path, ...rest }) => (
    Firebase.auth.currentUser 
        ? claim 
            ? <ClaimRoute exact path={path} claim={claim} component={Component} /> 
            : <Route {...rest}><Component /></Route>
        : <Redirect to="/login" />
);

export default withFirebase(ProtectedRoute);
