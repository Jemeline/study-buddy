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
            setAds(res.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
            {ads ? 
                ads.length !== 0 ? 
                    <TutorAdList isTutor={false} list={ads} /> 
                : "No Ads found" 
            : <div style={{zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',width:'100vw',overflow:'auto'}}><ReactLoading height={'10%'} width={'10%'} type={"cylon"} color={colorPalette.secondary}/></div>}
        </div>
    );
};

export default StudentFindTutors;