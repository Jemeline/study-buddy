/* Author: Jada Pfeiffer
Purpose: Component which displays when survey has already been submitted
to inform users that their previous responses will be deleted
Route: https://study-buddy-d452c.web.app/student-survey
*/
import React from 'react';

function SurveyResubmit({hidden}){
    return <div hidden={hidden}> 
            <h4 style={{margin:'auto',paddingBottom:'0.5vw',fontSize:'2vw',margin:'5px',fontFamily: 'Garamond, serif'}}>WE HAVE PREVIOUS SURVEY RESPONSES RECORDED FOR YOU, WOULD YOU LIKE TO SUBMIT ANYWAY?</h4>
            <p style={{margin:'auto',paddingBottom:'0.5vw',fontSize:'1vw'}}>(Your previous responses will be deleted)</p>
    </div>
};

export default SurveyResubmit;