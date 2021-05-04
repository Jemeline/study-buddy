import React, { useState, useEffect } from "react";
import { colorPalette } from "../../utils/design";
import TutorAdList from "./TutorAdList";
import ReactLoading from "react-loading";
import { getAllAds } from "../../utils/api";
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const StudentFindTutors = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        getAllAds().then(res => {
            setAds(res.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <div style={{backgroundColor:colorPalette.gray,zIndex:-1,height:'calc(100vh - 65px)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position:'fixed',width:'100vw',overflow:'auto'}}>
            <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="tutor" place="bottom" effect="float">
                <p style={{margin:0,width:'250px'}}>Browse our list of tutors to find one that suits your needs. You can view content posted by tutors below including courses they tutor, contact info, and ratings.</p>
            </ReactTooltip>  
            <h3 style={{margin:'10px',fontFamily: 'Garamond, serif'}}>Find A Tutor<InfoOutlinedIcon style={{height:'30px'}} data-tip data-for="tutor"/></h3>
            {ads ? 
                ads.length !== 0 ? 
                    <TutorAdList isTutor={false} list={ads} /> 
                : "No Ads found" 
            : <div style={{zIndex:-1,height:'calc(100vh - 65px)',display:'flex',justifyContent:'center',alignItems: 'center',width:'100vw',overflow:'auto'}}><ReactLoading height={'10%'} width={'10%'} type={"cylon"} color={colorPalette.secondary}/></div>}
        </div>
    );
};

export default StudentFindTutors;