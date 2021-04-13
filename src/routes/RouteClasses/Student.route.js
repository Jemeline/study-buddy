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