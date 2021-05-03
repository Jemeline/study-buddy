import React, {useEffect,useState} from 'react';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HearingIcon from '@material-ui/icons/Hearing';
import PanToolIcon from '@material-ui/icons/PanTool';
import FunctionsIcon from '@material-ui/icons/Functions';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import '../../survey.css';
import {storeLearningType} from '../utils/common';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { colorPalette } from '../../../../utils/design';
import { useHistory } from "react-router-dom";


function SurveyLearningType({learningType,setLearningType,hidden}){
    const [visual, setVisual] = useState((learningType.includes('visual')) ? 'selected': '');
    const [verbal, setVerbal] = useState((learningType.includes('verbal')) ? 'selected': '');
    const [social, setSocial] = useState((learningType.includes('social')) ? 'selected': '');
    const [solitary, setSolitary] = useState((learningType.includes('solitary')) ? 'selected': '');
    const [auditory, setAuditory] = useState((learningType.includes('auditory/musical')) ? 'selected': '');
    const [physical, setPhysical] = useState((learningType.includes('physical/kinaesthetic')) ? 'selected': '');
    const [logical, setLogical] = useState((learningType.includes('logical/mathematical')) ? 'selected': '');
    const history = useHistory();

    useEffect(() => {
        storeLearningType(learningType);
        setVisual((learningType.includes('visual')) ? 'selected': '');
        setVerbal((learningType.includes('verbal')) ? 'selected': '');
        setSocial((learningType.includes('social')) ? 'selected': '');
        setSolitary((learningType.includes('solitary')) ? 'selected': '');
        setAuditory((learningType.includes('auditory/musical')) ? 'selected': '');
        setPhysical((learningType.includes('physical/kinaesthetic')) ? 'selected': '');
        setLogical((learningType.includes('logical/mathematical')) ? 'selected': '');
    }, [learningType]);
    
    return <div hidden={hidden} style={{paddingBottom:'1.5vw'}}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw',fontFamily: 'Garamond, serif'}}>WHICH LEARNING STYLES ARE BEST FOR YOU?<a href="https://www.inspireeducation.net.au/blog/the-seven-learning-styles/"><InfoOutlinedIcon style={{height:'30px'}} data-tip data-for="survey-1"/></a></h4>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={verbal} onClick={(e)=>{selected(e);updateLearningType(e,'verbal',setLearningType,learningType)}} style={{marginLeft:"4%",marginRight:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <RecordVoiceOverIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{paddingTop:'0.5vh',paddingBottom:'1vh',fontSize:'2vw'}}>Verbal</h5>
                </div>
                <div className={visual} onClick={(e)=>{selected(e);updateLearningType(e,'visual',setLearningType,learningType)}} style={{marginRight:"2%",marginLeft:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>

                    <VisibilityIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{paddingTop:'0.5vh',paddingBottom:'1vh',fontSize:'2vw'}}>Visual</h5>
                </div>
                <div className={solitary} onClick={(e)=>{selected(e);updateLearningType(e,'solitary',setLearningType,learningType)}} style={{marginLeft:"2%",marginRight:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <PersonIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{paddingTop:'0.5vh',paddingBottom:'1vh',fontSize:'2vw'}}>Solitary</h5>
                </div>
                <div className={social} onClick={(e)=>{selected(e);updateLearningType(e,'social',setLearningType,learningType)}} style={{marginRight:"4%",marginLeft:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <GroupIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{paddingTop:'0.5vh',paddingBottom:'1vh',fontSize:'2vw'}}>Social</h5>
                </div>   
            </div>
            <br></br>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={auditory} onClick={(e)=>{selected(e);updateLearningType(e,'auditory/musical',setLearningType,learningType)}} style={{marginRight:"2%",marginLeft:"4%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <HearingIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'2vw'}}>Auditory</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.25vw'}}>(Musical)</h5>
                </div>
                <div className={physical} onClick={(e)=>{selected(e);updateLearningType(e,'physical/kinaesthetic',setLearningType,learningType)}} style={{marginRight:"2%",marginLeft:"2%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <PanToolIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'2vw'}}>Physical</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.25vw'}}>(Kinaesthetic)</h5>
                </div>
                <div className={logical} onClick={(e)=>{selected(e);updateLearningType(e,'logical/mathematical',setLearningType,learningType)}} style={{marginRight:"4%",marginLeft:"2%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <FunctionsIcon fontSize="large"/>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'2vw'}}>Logical</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.25vw'}}>(Mathematical)</h5>
                </div>
                <ReactTooltip textColor="white" backgroundColor={colorPalette.secondary} id="survey-1" place="bottom" effect="float">
                        <p style={{margin:0,width:'150px'}}>Click for more information on learning styles</p>
                </ReactTooltip>
            </div>
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