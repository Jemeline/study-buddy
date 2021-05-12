// Written by Randy Sievers

// Uses a test profile in the matching algorithm to ensure that all expected fields are returned with the proper types.
// Also checks to make sure that numeric values are within expected ranges


import { assert } from 'chai';
import { getWeightedSum } from '../components/Survey/MatchingAlgorithm';
import { apiGetStudentProfiles } from '../utils/api';


describe("Matching Algorithm Tests", () => {
    it("Returns an object with expected fields of proper types", async () => {
        const testProfile = {
            "_id": "TESTID",
            "courseSchedule": ["609acd593d1168af758cf809", "609acd593d1168af758cf80c", "609acd593d1168af758cf553"],
            "learningType": ["visual", "logical/mathematical", "physical/kinaesthetic", "solitary"],
            "studyLocation": [],
            "identifiers": ["first generation", "athlete"],
            "_userId": "TESTID1",
            "graduationYear": 2021,
            "studentType": "undergraduate",
            "programOfStudy": {
                "major": ["Computer Science Major, B.S.", "Mathematics Major, B.S."],
                "minor": []
            },
            "courseScheduleImproved": [
                {
                    "courseSubject": "COMP",
                    "courseNumber": 523
                },
                {
                    "courseSubject": "COMP",
                    "courseNumber": 541
                },
                {
                    "courseSubject": "CHEM",
                    "courseNumber": 101
                }
            ]
        }
        const matchingAlgorithmResult = await getWeightedSum(testProfile);
        const studentProfiles = (await apiGetStudentProfiles()).data;
        const sums = matchingAlgorithmResult.map(userRes => userRes["sum"]);
        const sharedMajors = matchingAlgorithmResult.map(res => res["sharedMajors"]);
        assert.typeOf(sums, 'array', "Sums is an array");
        assert.typeOf(sums[0], 'number', "Each sum is a number");
        sharedMajors.map(majors => assert.typeOf(majors, 'array'))
        assert.lengthOf(sums, studentProfiles.length, "Sum returned for each user");
        assert.property(matchingAlgorithmResult[0], "sharedClasses");
        assert.property(matchingAlgorithmResult[0], "sharedLearningType");
    });


    it("Should have percentMatch between 0 and 100", async () => {
        const testProfile = {
            "_id": "TESTID",
            "courseSchedule": ["609acd593d1168af758cf809", "609acd593d1168af758cf80c", "609acd593d1168af758cf553"],
            "learningType": ["visual", "logical/mathematical", "physical/kinaesthetic", "solitary"],
            "studyLocation": [],
            "identifiers": ["first generation", "athlete"],
            "_userId": "TESTID1",
            "graduationYear": 2021,
            "studentType": "undergraduate",
            "programOfStudy": {
                "major": ["Computer Science Major, B.S.", "Mathematics Major, B.S."],
                "minor": []
            },
            "courseScheduleImproved": [
                {
                    "courseSubject": "COMP",
                    "courseNumber": 523
                },
                {
                    "courseSubject": "COMP",
                    "courseNumber": 541
                },
                {
                    "courseSubject": "CHEM",
                    "courseNumber": 101
                }
            ]
        }
        const matchingAlgorithmResult = await getWeightedSum(testProfile);
        const percentMatches = matchingAlgorithmResult.map(userRes => userRes["percentMatch"]);
        percentMatches.map(pm => {
            assert.isAtLeast(pm, 0);
            assert.isAtMost(pm, 100);
        })
        
    });


    it("Should have sum between 0 and 195", async () => {
        const testProfile = {
            "_id": "TESTID",
            "courseSchedule": ["609acd593d1168af758cf809", "609acd593d1168af758cf80c", "609acd593d1168af758cf553"],
            "learningType": ["visual", "logical/mathematical", "physical/kinaesthetic", "solitary"],
            "studyLocation": [],
            "identifiers": ["first generation", "athlete"],
            "_userId": "TESTID1",
            "graduationYear": 2021,
            "studentType": "undergraduate",
            "programOfStudy": {
                "major": ["Computer Science Major, B.S.", "Mathematics Major, B.S."],
                "minor": []
            },
            "courseScheduleImproved": [
                {
                    "courseSubject": "COMP",
                    "courseNumber": 523
                },
                {
                    "courseSubject": "COMP",
                    "courseNumber": 541
                },
                {
                    "courseSubject": "CHEM",
                    "courseNumber": 101
                }
            ]
        }
        const matchingAlgorithmResult = await getWeightedSum(testProfile);
        const sums = matchingAlgorithmResult.map(userRes => userRes["sum"]);
        sums.map(sum => {
            assert.isAtLeast(sum, 0);
            assert.isAtMost(sum, 195);
        })
    });


    it("Should return sums in descending order", async () => {
        const testProfile = {
            "_id": "TESTID",
            "courseSchedule": ["609acd593d1168af758cf809", "609acd593d1168af758cf80c", "609acd593d1168af758cf553"],
            "learningType": ["visual", "logical/mathematical", "physical/kinaesthetic", "solitary"],
            "studyLocation": [],
            "identifiers": ["first generation", "athlete"],
            "_userId": "TESTID1",
            "graduationYear": 2021,
            "studentType": "undergraduate",
            "programOfStudy": {
                "major": ["Computer Science Major, B.S.", "Mathematics Major, B.S."],
                "minor": []
            },
            "courseScheduleImproved": [
                {
                    "courseSubject": "COMP",
                    "courseNumber": 523
                },
                {
                    "courseSubject": "COMP",
                    "courseNumber": 541
                },
                {
                    "courseSubject": "CHEM",
                    "courseNumber": 101
                }
            ]
        }
        const matchingAlgorithmResult = await getWeightedSum(testProfile);
        const sums = matchingAlgorithmResult.map(userRes => userRes["sum"]);
        for (let i = 0; i < sums.length - 1; i++) {
            assert.isAtLeast(sums[i], sums[i + 1]);
        }
    });
});