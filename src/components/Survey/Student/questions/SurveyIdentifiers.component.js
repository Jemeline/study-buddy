import React, {useEffect,useState} from 'react';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import RepeatOneOutlinedIcon from '@material-ui/icons/RepeatOneOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import FunctionsIcon from '@material-ui/icons/Functions';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import TransformOutlinedIcon from '@material-ui/icons/TransformOutlined';
import '../../survey.css';
import PoolOutlinedIcon from '@material-ui/icons/PoolOutlined';

function SurveyIdentifiers({identifiers,setIdentifiers,hidden}){
    const [firstGeneration, setFirstGeneration] = useState((identifiers.includes('first generation')) ? 'selected': '');
    const [outOfState, setOutOfState] = useState((identifiers.includes('out-of-state')) ? 'selected': '');
    const [international, setInternational] = useState((identifiers.includes('international')) ? 'selected': '');
    const [firstYear, setFirstYear] = useState((identifiers.includes('first year')) ? 'selected': '');
    const [athlete, setAthlete] = useState((identifiers.includes('athlete')) ? 'selected': '');
    const [greekLife, setGreekLife] = useState((identifiers.includes('greek life')) ? 'selected': '');
    const [transfer, setTransfer] = useState((identifiers.includes('transfer')) ? 'selected': '');


    useEffect(() => {
        setFirstGeneration((identifiers.includes('first generation')) ? 'selected': '');
        setOutOfState((identifiers.includes('out-of-state')) ? 'selected': '');
        setInternational((identifiers.includes('international')) ? 'selected': '');
        setFirstYear((identifiers.includes('first year')) ? 'selected': '');
        setAthlete((identifiers.includes('athlete')) ? 'selected': '');
        setGreekLife((identifiers.includes('greek life')) ? 'selected': '');
        setTransfer((identifiers.includes('transfer')) ? 'selected': '');
    }, [identifiers]);
    
    return <div hidden={hidden} style={{paddingBottom:'1.5vw'}}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw',fontFamily: 'Garamond, serif'}}>WHICH IDENTIFIERS DESCRIBE YOU?</h4>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={firstYear} onClick={(e)=>{selected(e);updateIdentifiers(e,'first year',setIdentifiers,identifiers)}} style={{marginLeft:"4%",marginRight:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <SchoolOutlinedIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{marginBottom:0,marginTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.3vw'}}>First</h5>
                    <h5 style={{marginBottom:0,marginTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.3vw'}}>Year</h5>
                </div>
                <div className={international} onClick={(e)=>{selected(e);updateIdentifiers(e,'international',setIdentifiers,identifiers)}} style={{marginRight:"2%",marginLeft:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <LanguageOutlinedIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{marginBottom:0,marginTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.3vw'}}>Inter-</h5>
                    <h5 style={{marginBottom:0,marginTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.3vw'}}>National</h5>
                </div>
                <div className={athlete} onClick={(e)=>{selected(e);updateIdentifiers(e,'athlete',setIdentifiers,identifiers)}} style={{marginLeft:"2%",marginRight:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <PoolOutlinedIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{marginBottom:'1vh',marginTop:'1vh',paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>Athlete</h5>
                </div>
                <div className={transfer} onClick={(e)=>{selected(e);updateIdentifiers(e,'transfer',setIdentifiers,identifiers)}} style={{marginRight:"4%",marginLeft:"2%",width: '25%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <TransformOutlinedIcon fontSize="large" style={{paddingTop:'1vh',paddingBottom:0}}/>
                    <h5 style={{marginBottom:'1vh',marginTop:'1vh',paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>Transfer</h5>
                </div>   
            </div>
            <br></br>
            <div style={{display: 'flex',justifyContent: "space-between"}}>
                <div className={firstGeneration} onClick={(e)=>{selected(e);updateIdentifiers(e,'first generation',setIdentifiers,identifiers)}} style={{marginRight:"2%",marginLeft:"4%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <RepeatOneOutlinedIcon fontSize="large" style={{marginBottom:'1vh',marginTop:'1vh'}}/>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>First</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>Generation</h5>
                </div>
                <div className={outOfState} onClick={(e)=>{selected(e);updateIdentifiers(e,'out-of-state',setIdentifiers,identifiers)}} style={{marginRight:"2%",marginLeft:"2%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <MapOutlinedIcon fontSize="large" style={{marginBottom:'1vh',marginTop:'1vh'}}/>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>Out Of</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>State</h5>
                </div>
                <div className={greekLife} onClick={(e)=>{selected(e);updateIdentifiers(e,'greek life',setIdentifiers,identifiers)}} style={{marginRight:"4%",marginLeft:"2%",width: '30%',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                    <FunctionsIcon fontSize="large" style={{marginBottom:'1vh',marginTop:'1vh'}}/>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>Greek</h5>
                    <h5 style={{paddingBottom:0,paddingTop:0,paddingLeft:3,paddingRight:3,fontSize:'1.5vw'}}>Life</h5>
                </div>
            </div>
    </div>
};

function selected(e) {
    let target = e.currentTarget;
    target.classList.toggle('selected');
};

function updateIdentifiers(e,updateValue,setIdentifiers,identifiers){
    let target = e.currentTarget;
    if (target.classList.value==='selected'){
        setIdentifiers(prevArray => [...prevArray, updateValue])
    } else {
        setIdentifiers(identifiers.filter(item => item !== updateValue));
        
    }
};

export default SurveyIdentifiers;