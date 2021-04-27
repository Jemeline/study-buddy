import {React, useState, useEffect} from 'react';
import {colorPalette} from '../../../utils/design';
import ReactLoading from 'react-loading';
import {getWeightedSum} from '../MatchingAlgorithm';
import {getUser} from '../../../utils/common';
import { apiGetStudentProfile } from '../../../utils/api';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router';

function SurveyComplete({hidden}){
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw'}}>Good News... We found some great study partners for you!</h4>  
    </div>
};

export default SurveyComplete;