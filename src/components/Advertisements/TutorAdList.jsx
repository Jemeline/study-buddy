import React from "react";
import TutorAd from "./TutorAd";

// List of Tutor Advertisements
// list: [ {"tutorEmail": "tutor@email.com", "text": "ad text", "courses": "COMP-523, COMP-110"} ]
const TutorAdList = ({ list }) => {
    return (
        <div>
            {list.map((item, key) => 
                <TutorAd key={key} tutorEmail={item.tutorEmail} text={item.text} courses={item.courses} />
            )}
        </div>
    );
};

export default TutorAdList;
