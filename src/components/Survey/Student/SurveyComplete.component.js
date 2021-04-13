import React from 'react';
import {colorPalette} from '../../../utils/design';
import ReactLoading from 'react-loading';

function SurveyComplete({hidden}){
    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw'}}>JUST A MOMENT WHILE WE GATHER YOUR PERSONALIZED MATCHES</h4>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactLoading  type={"cylon"} color={colorPalette.secondary} height={'25%'} width={'25%'}/> 
            </div>         
    </div>
};

export default SurveyComplete;