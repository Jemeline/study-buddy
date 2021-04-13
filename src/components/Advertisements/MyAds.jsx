import React, { useState, useEffect } from "react";
import TutorAdList from "./TutorAdList";
import { getUser } from "../../utils/common";
const axios = require("axios");

// List of Ads by currently logged in tutor
const MyAds = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        const base = "https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api"
        axios.post(`${base}/advertisement/email`, {"email": JSON.parse(getUser()).email})
        .then(res => {
            console.log(res.data);
            setAds(res.data);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h4>My Advertisements</h4>
            {ads ? <TutorAdList list={ads} /> : "Loading..."}
        </div>
    );
};

export default MyAds;