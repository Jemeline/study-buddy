import React from 'react';
import { Route} from 'react-router-dom';

const PublicRoute = ({ component: Component , ...path})=>{
    return (
        <Route {...path}  component={(props)=>(
            <div>
                <Component {...props} />
            </div>
        )}
        />
    )
};

export default PublicRoute;
