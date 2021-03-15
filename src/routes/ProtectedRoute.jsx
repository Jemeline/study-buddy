import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";

// User must be logged in to access ProtectedRoute
const ProtectedRoute = ({ Firebase, component: Component, ...rest }) => (
    <Route {...rest}
        render={props => (
            Firebase.auth.currentUser !== null 
                ? <Component {...rest} {...props} />
                : <Redirect to="/login" />
        )}
    />
);

export default withFirebase(ProtectedRoute);
