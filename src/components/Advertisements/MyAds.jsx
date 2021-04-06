import React from "react";
import TutorAdList from "./TutorAdList";

// List of Ads by currently logged in tutor
const MyAds = () => {
    const adList = [{
        "tutorEmail": "email@tutor.com",
        "text": "my advertisement text",
        "courses": "COMP-523, COMP-550"
    }, {
        "tutorEmail": "email@tutor.com",
        "text": "my other advertisement text",
        "courses": "COMP-410, COMP-411"
    }];
    return (
        <div>
            <h4>My Advertisements</h4>
            <TutorAdList list={adList} />
        </div>
    );
};

export default MyAds;