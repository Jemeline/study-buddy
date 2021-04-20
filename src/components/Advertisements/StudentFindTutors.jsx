import React, { useState, useEffect } from "react";
import TutorAdList from "./TutorAdList";
import { getAllAds } from "../../utils/api";

// Student Help Center- find Tutors
const StudentFindTutors = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        getAllAds().then(res => {
            // console.log(res.data);
            setAds(res.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h4>Tutors</h4>
            {ads ? 
                ads.length !== 0 ? 
                    <TutorAdList isTutor={false} list={ads} /> 
                : "No Ads found" 
            : "Loading..."}
        </div>
    );
};

export default StudentFindTutors;