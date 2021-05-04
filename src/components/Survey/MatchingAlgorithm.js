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
    const total = ((student.courseSchedule.length<2)?student.courseSchedule.length * 50:100) + student.programOfStudy.major.length * 20 + 15 + student.identifiers.length * 10 + student.learningType.length * 5;

    for (let i = 0; i < studentProfiles.length; i++) {
        matches[i] = {
            "id": studentProfiles[i]._id, 
            "sum": 0, 
            "sharedClasses": [], 
            "sharedLearningType": [], 
            "sharedStudyLocation": [], 
            "sharedIdentifiers": [],
            "sharedMajors": [],
            "sharedGradYear": [],
            "percentMatch": 0,
        };
    }
    for (let i = 0; i < studentProfiles.length; i++) {
        if (studentProfiles[i]._id !== student._id) {
            for (let j = 0; j < student.courseSchedule.length; j++) {
                const cleanCourseArr = studentProfiles[i].courseScheduleImproved.map(course=>course.courseSubject + " " + course.courseNumber);
                const cleanCourse = student.courseScheduleImproved[j].courseSubject+ " " +student.courseScheduleImproved[j].courseNumber;
                if (cleanCourseArr.includes(cleanCourse)) {
                    matches[i]["sum"] += 50;
                    const course = (await apiGetCourseById(student.courseSchedule[j])).data;
                    const courseClean = course.courseSubject + " " + course.courseNumber;
                    matches[i]["sharedClasses"].push(courseClean);
                    console.log(matches[i]["sharedClasses"]);
                }
            }
            for (let n = 0; n < student.programOfStudy.major.length; n++) {
                if (studentProfiles[i].programOfStudy.major.includes(student.programOfStudy.major[n])) {
                    matches[i]["sum"] += 20;
                    matches[i]["sharedMajors"].push(student.programOfStudy.major[n])
                }
            }
            if (studentProfiles[i].graduationYear === student.graduationYear) {
                matches[i]["sum"] += 15
                matches[i]["sharedGradYear"] = true;
            } else {
                matches[i]["sharedGradYear"] = false;
            }
            for (let m = 0; m < student.identifiers.length; m++) {
                if (studentProfiles[i].identifiers.includes(student.identifiers[m])) {
                    matches[i]["sum"] += 10;
                    matches[i]["sharedIdentifiers"].push(student.identifiers[m])
                }
            }
            for (let k = 0; k < student.learningType.length; k++) {
                if (studentProfiles[i].learningType.includes(student.learningType[k])) {
                    matches[i]["sum"] += 5;
                    matches[i]["sharedLearningType"].push(student.learningType[k])
                }
            }
        }
    }

    for (let i = 0; i < matches.length; i++) {
        const percent = Math.floor(matches[i]["sum"] * 100 / total);
        matches[i]["percentMatch"] = (percent>100)?100:percent;
    }

    matches.sort((a, b) => b["sum"] - a["sum"]);
    return matches;
}
