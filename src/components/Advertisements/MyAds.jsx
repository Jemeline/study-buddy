import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colorPalette } from "../../utils/design";
import TutorAdList from "./TutorAdList";
import ReactLoading from "react-loading";
import { getUser } from "../../utils/common";
import { getAllAds } from "../../utils/api";

// List of Ads by currently logged in tutor
const MyAds = () => {
    const [ads, setAds] = useState(null);
    
    useEffect(() => {
        getAllAds().then(res => {
            setAds(res.data.filter(e=>e.tutorEmail === JSON.parse(getUser()).email));
        })
    }, []);

    return (
        <div>
            <h4>My Advertisements</h4>
            <br/>
            {ads ? 
                ads.length !== 0 ? 
                    <TutorAdList isTutor={true} list={ads} /> 
                : <Link to="/create-ad">Create your first Ad!</Link>
            : 
            <div style={{zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',width:'100vw',overflow:'auto'}}><ReactLoading height={'10%'} width={'10%'} type={"cylon"} color={colorPalette.secondary}/></div>}
        </div>
    );
};

export default MyAds;