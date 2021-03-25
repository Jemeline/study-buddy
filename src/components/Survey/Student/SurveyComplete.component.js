import React from 'react';
import {colorPalette} from '../../../utils/design';
import ReactLoading from 'react-loading';

function SurveyRedirect({hidden}){
    return <div hidden={hidden}> 
            <h4>JUST A MOMENT WHILE WE GATHER YOUR PERSONALIZED MATCHES</h4>
            <br></br>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactLoading  type={"cylon"} color={colorPalette.secondaryB} height={'25%'} width={'25%'} /> 
            </div> 
            
    </div>
};

export default SurveyRedirect;