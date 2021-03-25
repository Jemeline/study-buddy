import axios from 'axios';

export async function apiLogin(userData) {
    try { // app
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/user/login', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiRegister(userData) {
    try { // app3
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/user/register', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiVerify(userData) {
    try { // app4
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/token/verify', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiToken(userData) {
    try { // app4
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/token', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiGetCoursesBySubject(subject) {
    try { // app6
        const res = await axios.get(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/course/find-by-subject/${subject}`);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiCreateStudentProfile(surveyPayload) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app7/api/student-profile',surveyPayload);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};