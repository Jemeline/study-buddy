/* Author: Jada Pfeiffer
Purpose: Route wrapped for the Admin components
User may only go to an AdminRoute if they are logged in 
and have the role of "admin"
Else they are redirected to login or the appropriate dashboard
*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getRole,getRoleLiteral,getLoginStatus} from "../../utils/common";

const AdminRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>{
            if (getLoginStatus()){
                if (getRole('admin')){
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


export default AdminRoute;