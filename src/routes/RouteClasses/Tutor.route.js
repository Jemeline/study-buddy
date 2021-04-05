import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getRole,getIsVerified,getRoleLiteral,getLoginStatus} from "../../utils/common";

const TutorRoute = ({ component: Component,setIsHome, ...path }) => {
    setIsHome(false);
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