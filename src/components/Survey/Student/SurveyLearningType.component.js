import React, {useEffect,useState} from 'react';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import PanToolIcon from '@material-ui/icons/PanTool';
import FunctionsIcon from '@material-ui/icons/Functions';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import '../survey.css';
import {storeLearningType} from './common';

function SurveyLearningType({learningType,setLearningType,hidden}){
    const [visual, setVisual] = useState((learningType.includes('visual')) ? 'selected': '');
    const [verbal, setVerbal] = useState((learningType.includes('verbal')) ? 'selected': '');
    const [social, setSocial] = useState((learningType.includes('social')) ? 'selected': '');
    const [solitary, setSolitary] = useState((learningType.includes('solitary')) ? 'selected': '');
    const [auditory, setAuditory] = useState((learningType.includes('auditory/musical')) ? 'selected': '');
    const [physical, setPhysical] = useState((learningType.includes('physical/kinaesthetic')) ? 'selected': '');
    const [logical, setLogical] = useState((learningType.includes('logical/mathematical')) ? 'selected': '');


    useEffect(() => {
        storeLearningType(learningType);
    }, [learningType]);
    
    return <div hidden={hidden}> 
            <h4>WHICH LEARNING STYLES ARE BEST FOR YOU?</h4>
            <br></br>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={verbal} onClick={(e)=>{selected(e);updateLearningType(e,'verbal',setLearningType,learningType)}} style={{marginLeft:"4%",marginRight:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <RecordVoiceOverIcon fontSize="large"/>
                    <h5 style={{paddingTop:5}}>Verbal</h5>
                    <br></br>
                </div>
                <div className={visual} onClick={(e)=>{selected(e);updateLearningType(e,'visual',setLearningType,learningType)}} style={{marginRight:"2%",marginLeft:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <VisibilityIcon fontSize="large"/>
                    <h5 style={{paddingTop:5}}>Visual</h5>
                    <br></br>
                </div>
                <div className={solitary} onClick={(e)=>{selected(e);updateLearningType(e,'solitary',setLearningType,learningType)}} style={{marginLeft:"2%",marginRight:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <PersonIcon fontSize="large"/>
                    <h5 style={{paddingTop:5}}>Solitary</h5>
                    <br></br>
                </div>
                <div className={social} onClick={(e)=>{selected(e);updateLearningType(e,'social',setLearningType,learningType)}} style={{marginRight:"4%",marginLeft:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <GroupIcon fontSize="large"/>
                    <h5 style={{paddingTop:5}}>Social</h5>
                    <br></br>
                </div>   
            </div>
            <br></br>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={auditory} onClick={(e)=>{selected(e);updateLearningType(e,'auditory/musical',setLearningType,learningType)}} style={{marginRight:"2%",marginLeft:"4%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <HearingIcon fontSize="large"/>
                    <h5 style={{paddingBottom:0,paddingTop:5}}>Auditory</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.25vw'}}>(Musical)</h5>
                    <br></br>
                </div>
                <div className={physical} onClick={(e)=>{selected(e);updateLearningType(e,'physical/kinaesthetic',setLearningType,learningType)}} style={{marginRight:"2%",marginLeft:"2%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <PanToolIcon fontSize="large"/>
                    <h5 style={{paddingBottom:0,paddingTop:5}}>Physical</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.25vw'}}>(Kinaesthetic)</h5>
                    <br></br>
                </div>
                <div className={logical} onClick={(e)=>{selected(e);updateLearningType(e,'logical/mathematical',setLearningType,learningType)}} style={{marginRight:"4%",marginLeft:"2%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <br></br>
                    <FunctionsIcon fontSize="large"/>
                    <h5 style={{paddingBottom:0,paddingTop:5}}>Logical</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.25vw'}}>(Mathematical)</h5>
                    <br></br>
                </div>
            </div>
            <br></br>
    </div>
};

function selected(e) {
    let target = e.currentTarget;
    target.classList.toggle('selected');
};

function updateLearningType(e,updateValue,setLearningType,learningType){
    let target = e.currentTarget;
    if (target.classList.value==='selected'){
        setLearningType(prevArray => [...prevArray, updateValue])
    } else {
        setLearningType(learningType.filter(item => item !== updateValue));
        
    }
};

export default SurveyLearningType;