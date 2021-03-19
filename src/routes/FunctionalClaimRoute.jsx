import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";

// Trying to convert ClaimRoute.jsx to a functional component
// So far unable to do so without errors :(
const ClaimRoute = ({ component: Component, claim, Firebase, ...rest }) => {
    const [claims, setClaims] = useState({"student": false, "tutor": false, "admin": false});
    useEffect(() => async () => {
        const userClaims = await Firebase.getClaims().catch(err => console.error(err));
        // console.log(claims);
        setClaims(userClaims);
    }, [Firebase]);
    
    return (
        claims[claim] 
        ? <Route {...rest} ><Component /></Route>
        : <Redirect to="/login" />
    );
};

export default withFirebase(ClaimRoute);
