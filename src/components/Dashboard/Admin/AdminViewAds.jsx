import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TutorAdList from "../../Advertisements/TutorAdList";
import { getAllAds } from "../../../utils/api";

// Admin Dash - View Tutor Ads
const AdminViewAds = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        getAllAds().then(res => {
            // console.log(res.data);
            setAds(res.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <Container>
            <h4>Tutor Ads</h4>
            {ads ? 
                ads.length !== 0 ? 
                    <TutorAdList isTutor={true} list={ads} /> 
                : "No Ads found" 
            : "Loading..."}
        </Container>
    );
};

export default AdminViewAds;