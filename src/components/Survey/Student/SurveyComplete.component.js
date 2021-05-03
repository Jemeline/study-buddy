import {React, useState} from 'react';
import { useHistory } from 'react-router';

function SurveyComplete({hidden}){
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw',fontFamily: 'Garamond, serif'}}>Good News... We found some great study partners for you!</h4>  
    </div>
};

export default SurveyComplete;