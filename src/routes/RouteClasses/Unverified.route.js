import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {getIsVerified,getRoleLiteral,getLoginStatus} from "../../utils/common";

const UnverifiedRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>{
            if (getLoginStatus()){
                if (!getIsVerified()){
                    return <div>
                      <Component {...props} />
                    </div>
                } else {
                    return <Redirect to={{pathname:`/dashboard/${getRoleLiteral()}`}} /> 
                }
            } else {
                return <Redirect to="/" />
            }
        }}
        />                         
    )
};


export default UnverifiedRoute;