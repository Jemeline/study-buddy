import {React, useState, useEffect} from 'react';
import {colorPalette} from '../../../utils/design';
import ReactLoading from 'react-loading';
import StudentDashboard from '../../Dashboard/StudentDashboard.component';
import StudentUserList from '../../Dashboard/Student/StudentUserList.component';
import {getWeightedSum} from '../MatchingAlgorithm';
import {getUser} from '../../../utils/common';
import { apiGetStudentProfile } from '../../../utils/api';
import { useHistory } from 'react-router';

function SurveyComplete({hidden}){

    const [userSums, setUserSums] = useState(null);

    const history = useHistory();

    useEffect(async () => {
        if (!hidden) {
            const user = JSON.parse(getUser());
            const profile = (await apiGetStudentProfile(user._id)).data;
            setUserSums(await getWeightedSum(profile));
            history.push('/dashboard/student');
        }
    }, [hidden]);

    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'1.5vw',fontSize:'2vw'}}>JUST A MOMENT WHILE WE GATHER YOUR PERSONALIZED MATCHES</h4>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactLoading  type={"cylon"} color={colorPalette.secondary} height={'25%'} width={'25%'}/>
            </div>         
    </div>
};

export default SurveyComplete;