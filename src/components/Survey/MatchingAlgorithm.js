// Written by Randy Sievers

// Matching algorithm to be used upon completion of student survey
// Uses a weighted sum of similar answers between the survey-taking student and other users
// Weights are based on answers given by student as to which questions matter most to them

import axios from 'axios';
import {apiGetCourseById} from '../../utils/api';


// Retrieve list of student profiles
async function getStudentProfiles() {
    const profileData = await axios({
        method: 'get',
        url: 'https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/student-profile',
    });
    const studentProfiles = profileData.data;
    return studentProfiles;
}

// Use survey responses to generate weighted sum of similar answers
export async function getWeightedSum(student) {
    const studentProfiles = await getStudentProfiles();
    
    let matches = [];
    const total = student.courseSchedule.length * 50 + student.learningType.length * 5 + student.identifiers.length*5;

    for (let i = 0; i < studentProfiles.length; i++) {
        matches[i] = {
            "id": studentProfiles[i]._id, 
            "sum": 0, 
            "sharedClasses": [], 
            "sharedLearningType": [], 
            "sharedStudyLocation": [], 
            "sharedIdentifiers": [],
            "percentMatch": 0
        };
    }
    for (let i = 0; i < studentProfiles.length; i++) {
        if (studentProfiles[i]._id !== student._id) {
            for (let j = 0; j < student.courseSchedule.length; j++) {
                if (studentProfiles[i].courseSchedule.includes(student.courseSchedule[j])) {
                    // Add a large value if the students have a class in common, so that they show up at the top of the results
                    // After the first class, the value added decreases because each additional class is less significant
                    matches[i]["sum"] += 50;
                    const course = (await apiGetCourseById(student.courseSchedule[j])).data;
                    const courseClean = course.courseSubject + " " + course.courseNumber;
                    matches[i]["sharedClasses"].push(courseClean);
                }
            }
            for (let k = 0; k < student.learningType.length; k++) {
                if (studentProfiles[i].learningType.includes(student.learningType[k])) {
                    matches[i]["sum"] += 5;
                    matches[i]["sharedLearningType"].push(student.learningType[k])
                }
            }
            for (let l = 0; l < student.studyLocation.length; l++) {
                if (studentProfiles[i].studyLocation.includes(student.studyLocation[l])) {
                    matches[i]["sum"] += 2;
                    matches[i]["sharedStudyLocation"].push(student.studyLocation[l])

                }
            }
            for (let m = 0; m < student.identifiers.length; m++) {
                if (studentProfiles[i].identifiers.includes(student.identifiers[m])) {
                    matches[i]["sum"] += 5;
                    matches[i]["sharedIdentifiers"].push(student.identifiers[m])
                }
            }
        }
    }

    for (let i = 0; i < matches.length; i++) {
        matches[i]["percentMatch"] = Math.floor(matches[i]["sum"] * 100 / total)
    }

    matches.sort((a, b) => b["sum"] - a["sum"]);
    return matches;
}
