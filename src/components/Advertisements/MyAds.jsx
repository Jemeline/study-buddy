import React, { useState, useEffect } from "react";
import { colorPalette } from "../../utils/design";
import TutorAdList from "./TutorAdList";
import ReactLoading from "react-loading";
import { getUser } from "../../utils/common";
import { getAdsByEmail } from "../../utils/api";

// List of Ads by currently logged in tutor
const MyAds = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        const email = JSON.parse(getUser()).email;
        getAdsByEmail(email).then(res => {
            // console.log(res.data);
            setAds(res.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h4>My Advertisements</h4>
            {ads ? 
                ads.length !== 0 ? 
                    <TutorAdList isTutor={true} list={ads} /> 
                : "Create your first Ad!" 
            : <ReactLoading type={"cylon"} color={colorPalette.secondary} />}
        </div>
    );
};

export default MyAds;