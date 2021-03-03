import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {getRole} from "../utils/common";

const StudentRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>(
            getRole("student") ?
            <div>
                <Component {...props} />
            </div>
            :<Redirect to="/login" />
        )}
        />                         
    )
};
export default StudentRoute;