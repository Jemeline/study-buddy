/* Author: Jada Pfeiffer
Purpose: Tutor profile component for tutor rating tab
Calculates adn displays avarage rating for tutor and also
displays number of active ads
Route: https://study-buddy-d452c.web.app/tutor-profile
*/
import React,{useState,useEffect} from 'react';
import {colorPalette} from '../../../utils/design';
import {apiUpdateUser,getAllAds} from '../../../utils/api';
import avatarUnknown from '../Student/unknown-avatar.jpg';
import {InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';
import ReactLoading from 'react-loading';

function TutorRating({user,setUser,hidden}) {
    const [avatar, setAvatar] = useState('');
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [error, setError] = useState(false);
    const [average,setAverage]=useState('Unrated');
    const [activeAds,setActiveAds]=useState(0);

    useEffect(async () => {
      try{
        setLoadingAvatar(true);
        setError(false);
        const data = await apiUpdateUser(user._id,{});
        const ads = await getAllAds();
        const avgArr = await ads.data.filter(e=>e.tutorEmail===user.email).map(e=>e.ratings).flat();
        const numAds = await ads.data.filter(e=>e.tutorEmail===user.email).length;
        setActiveAds(numAds);
        if (avgArr.length > 0){
            const avg = avgArr.reduce((a, b) => a + b) / avgArr.length;
            setAverage(avg);
        }
        if (data.data != null) {
          setAvatar(data.data.avatar);
          setLoadingAvatar(false);
        } else {
          setError(true);
        }  
      } catch (err){
        setError(true);
      }  
    }, []);

    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Tutor Rating</h5>
      <div style={{width:'65vw',display:'flex',alignItems: 'center',justifyContent:'flex-start',padding:'1vw'}}>
        <div style={{margin:'1vw'}}>
        {(loadingAvatar)?
          <ReactLoading hidden={!loadingAvatar} type={"cylon"} color={colorPalette.secondary} height={'10%'} width={'10%'} /> :
          (!avatar)?<img src={avatarUnknown} style={{height:'10vw',width: '10vw'}}/>:
          <img src={avatar} style={{maxHeight:'10vw',maxWidth: '10vw',objectFit:'cover'}}/>
        }
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto',width:'20vw'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Rating</InputGroupText>
            </InputGroupAddon>
            <Input
                style={{backgroundColor:'white'}}
                value={average}
                style={{backgroundColor:'white',fontSize:'1.2vw'}}
            />
          </InputGroup>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto',width:'20vw'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Active Ads</InputGroupText>
            </InputGroupAddon>
            <Input
                style={{backgroundColor:'white'}}
                value={activeAds}
                style={{backgroundColor:'white',fontSize:'1.2vw'}}
            />
          </InputGroup>
        </div>
      </div>
    </div>
};

export default TutorRating;