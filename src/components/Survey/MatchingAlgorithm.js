// Written by Randy Sievers

// Matching algorithm to be used upon completion of student survey
// Uses a weighted sum of similar answers between the survey-taking student and other users
// Weights are based on answers given by student as to which questions matter most to them

import axios from 'axios';


// Retrieve list of student profiles
async function getStudentProfiles() {
    const profileData = await axios({
        method: 'get',
        url: 'https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/student-profile',
    });
    const studentProfiles = profileData.data;
    return studentProfiles;
}

// Use survey responses to generate weighted sum of similar answers
export async function getWeightedSum(student) {
    const studentProfiles = await getStudentProfiles();
    let sums = [];
    for (let i = 0; i < studentProfiles.length; i++) {
        sums[i] = [studentProfiles[i]._id, 0];
    }
    for (let i = 0; i < studentProfiles.length; i++) {
        if (studentProfiles[i]._id !== student._id) {
            for (let j = 0; j < student.courseSchedule.length; j++) {
                if (studentProfiles[i].courseSchedule.includes(student.courseSchedule[j])) {
                    // Add a large value if the students have a class in common, so that they show up at the top of the results
                    sums[i][1] += 50;
                    break;
                }
            }
            for (let k = 0; k < student.learningType.length; k++) {
                if (studentProfiles[i].learningType.includes(student.learningType[k])) {

                    // sums[i] += student.weights[0];
                    sums[i][1] += 3;
                }
            }
            for (let l = 0; l < student.studyLocation.length; l++) {
                if (studentProfiles[i].studyLocation.includes(student.studyLocation[l])) {

                    // sums[i] += student.weights[1];
                    sums[i][1] += 2;
                }
            }
            for (let m = 0; m < student.identifiers.length; m++) {
                if (studentProfiles[i].identifiers.includes(student.identifiers[m])) {

                    // sums[i] += student.weights[2];
                    sums[i][1] += 1;
                }
            }
        }
    }
    sums.sort((a, b) => b[1] - a[1]);
    return sums;
}
