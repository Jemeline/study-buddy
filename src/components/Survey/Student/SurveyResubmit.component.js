import React from 'react';


function SurveyResubmit({hidden}){
    return <div hidden={hidden}> 
            <h4>WE ALREADY HAVE SURVEY RESPONSES RECORDED FOR YOU, WOULD YOU LIKE TO SUBMIT ANYWAY?</h4>
            <p>(Your previous responses will be deleted)</p>
    </div>
};

export default SurveyResubmit;