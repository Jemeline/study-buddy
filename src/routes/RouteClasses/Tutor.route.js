/* Author: Jada Pfeiffer
Purpose: Route wrapped for the Tutor components
User may only go to an TutorRoute if they are logged in 
and have the role of "tutor"
Else they are redirected to login or the appropriate dashboard
*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getRole,getRoleLiteral,getLoginStatus} from "../../utils/common";

const TutorRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>{
            if (getLoginStatus()){
                if (getRole('tutor')){
                    return <div>
                        <Component {...props} />
                    </div>
                } else {
                    return <Redirect to={{pathname:`/dashboard/${getRoleLiteral()}`}} /> 
                }
            } else {
                return <Redirect to="/auth" />
            }    
        }}
        />                     
)};


export default TutorRoute;