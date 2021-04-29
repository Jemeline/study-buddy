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
    for (let i = 0; i < studentProfiles.length; i++) {
        matches[i] = {
            "id": studentProfiles[i]._id, 
            "sum": 0, 
            "sharedClasses": [], 
            "sharedLearningType": [], 
            "sharedStudyLocation": [], 
            "sharedIdentifiers": []
        };
    }
    for (let i = 0; i < studentProfiles.length; i++) {
        if (studentProfiles[i]._id !== student._id) {
            for (let j = 0; j < student.courseSchedule.length; j++) {
                if (studentProfiles[i].courseSchedule.includes(student.courseSchedule[j])) {
                    // Add a large value if the students have a class in common, so that they show up at the top of the results
                    if (matches[i]["sum"] < 50) {
                        matches[i]["sum"] += 50;
                    }
                    const course = (await apiGetCourseById(student.courseSchedule[j])).data;
                    const courseClean = course.courseSubject + " " + course.courseNumber;
                    matches[i]["sharedClasses"].push(courseClean);
                }
            }
            for (let k = 0; k < student.learningType.length; k++) {
                if (studentProfiles[i].learningType.includes(student.learningType[k])) {

                    // matches[i] += student.weights[0];
                    matches[i]["sum"] += 3;
                    matches[i]["sharedLearningType"].push(student.learningType[k])
                }
            }
            for (let l = 0; l < student.studyLocation.length; l++) {
                if (studentProfiles[i].studyLocation.includes(student.studyLocation[l])) {

                    // matches[i] += student.weights[1];
                    matches[i]["sum"] += 2;
                    matches[i]["sharedStudyLocation"].push(student.studyLocation[l])

                }
            }
            for (let m = 0; m < student.identifiers.length; m++) {
                if (studentProfiles[i].identifiers.includes(student.identifiers[m])) {

                    // matches[i] += student.weights[2];
                    matches[i]["sum"] += 1;
                    matches[i]["sharedIdentifiers"].push(student.identifiers[m])
                }
            }
        }
    }
    matches.sort((a, b) => b["sum"] - a["sum"]);
    return matches;
}
