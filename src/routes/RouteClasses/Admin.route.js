import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getRole,getIsVerified,getRoleLiteral,getLoginStatus} from "../../utils/common";

const AdminRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>{
            if (getLoginStatus()){
                if (getRole('admin')){
                    if (getIsVerified()){
                        return <div>
                          <Component {...props} />
                        </div>
                    } else {
                        return <Redirect to="/verify" /> 
                    }
                } else {
                    return <Redirect to={{pathname:`/dashboard/${getRoleLiteral()}`}} /> 
                }
            } else {
                return <Redirect to="/" />
            }    
        }}
        />                       
)};


export default AdminRoute;