/* Author: Jada Pfeiffer
Purpose: Route wrapped for the Student components
User may only go to an StudentRoute if they are logged in 
and have the role of "student"
Else they are redirected to login or the appropriate dashboard
*/
import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {getRole,getRoleLiteral,getLoginStatus} from "../../utils/common";

const StudentRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>{
            if (getLoginStatus()){
                if (getRole('student')){
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
    )
};
export default StudentRoute;