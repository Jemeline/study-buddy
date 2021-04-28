import React, { useState, useEffect } from "react";
import { colorPalette } from "../../utils/design";
import TutorAdList from "./TutorAdList";
import ReactLoading from "react-loading";
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
            : <ReactLoading type={"cylon"} color={colorPalette.secondary}/>}
        </div>
    );
};

export default StudentFindTutors;