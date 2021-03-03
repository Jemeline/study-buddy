import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getRole} from "../utils/common";

const TutorRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>(
            getRole("tutor") ?
            <div>
                <Component {...props} />
            </div>
            :<Redirect to="/login" />
        )}
        />                         
)};


export default TutorRoute;