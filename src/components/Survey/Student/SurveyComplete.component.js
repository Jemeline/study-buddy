/* Author: Jada Pfeiffer
Purpose: Component which displays when survey has been sent
Route: https://study-buddy-d452c.web.app/student-survey
*/
import {React, useState} from 'react';
import { useHistory } from 'react-router';

function SurveyComplete({hidden}){
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw',fontFamily: 'Garamond, serif'}}>We've found you some great study partners!</h4> 
    </div>
};

export default SurveyComplete;