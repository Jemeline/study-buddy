export function storeGraduationYear(graduationYear){
    sessionStorage.setItem('graduationYear',graduationYear);
};

export function getGraduationYear(){
    return sessionStorage.getItem('graduationYear') || null;
};

export function storeStudentType(studentType){
    sessionStorage.setItem('studentType',studentType);
};

export function getStudentType(){
    return sessionStorage.getItem('studentType') || null;
};

export function storeMajor(major){
    sessionStorage.setItem('major',JSON.stringify(major));
};

export function getMajor(){
    return sessionStorage.getItem('major') || null;
};

export function storeMinor(minor){
    sessionStorage.setItem('minor',JSON.stringify(minor));
};

export function getMinor(){
    return sessionStorage.getItem('minor') || null;
};

export function storeGraduatePOS(graduatePOS){
    sessionStorage.setItem('graduatepos',JSON.stringify(graduatePOS));
};

export function getGraduatePOS(){
    return sessionStorage.getItem('graduatepos') || null;
};

export function storeCurrPage(currPage){
    sessionStorage.setItem('currPage',currPage);
};

export function getCurrPage(){
    return sessionStorage.getItem('currPage') || null;
};

export function storeCourseSchedule(courseSchedule){
    sessionStorage.setItem('courseSchedule',JSON.stringify(courseSchedule));
};

export function getCourseSchedule(){
    return sessionStorage.getItem('courseSchedule') || null;
};

export function storeLearningType(learningType){
    sessionStorage.setItem('learningType',JSON.stringify(learningType));
};

export function getLearningType(){
    return sessionStorage.getItem('learningType') || null;
};

export const LearningTypes = ["verbal", "visual", "auditory/musical", "physical/kinaesthetic",
"logical/mathematical", "social", "solitary"];

export const Identifiers = ["first generation", "out-of-state", "international", "first year",
"greek life", "athlete", "transfer"];
