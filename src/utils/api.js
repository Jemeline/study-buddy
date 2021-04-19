import axios from 'axios';

// deployed API (firebase deploy --only functions)
const baseAPI = "https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api";
// Testing API (npm run serve)
// const baseAPI = "http://localhost:5001/study-buddy-d452c/us-central1/app8/api";

export async function apiLogin(userData) {
    try { // app
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/user/login', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiRegister(userData) {
    try { // app3
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/user/register', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiVerify(userData) {
    try { // app4
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/token/verify', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiToken(userData) {
    try { // app4
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/token', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiGetCoursesBySubject(subject) {
    try { // app6
        const res = await axios.get(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/course/find-by-subject/${subject}`);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiCreateStudentProfile(surveyPayload) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/student-profile',surveyPayload);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiResubmitStudentProfile(surveyPayload) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/student-profile/resubmit',surveyPayload);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiUpdateUser(id,userData) {
    try {
        const res = await axios.post(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/user/update/${id}`, userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiGetStudentProfile(id) {
    try {
        const res = await axios.get(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/student-profile/find-by-id/${id}`);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiGetStudents() {
    try {
        const res = await axios.get(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/user/student`);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiGetStudentProfiles() {
    try {
        const res = await axios.get(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/student-profile`);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiDeleteUser(id) {
    try {
        const res = await axios.delete(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/user/${id}`);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiUpdatePassword(id,userData) {
    try {
        const res = await axios.post(`https://us-central1-study-buddy-d452c.cloudfunctions.net/app8/api/user/update/password/${id}`, userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export const createAd = async data => {
    try {
        const res = await axios.post(`${baseAPI}/advertisement`, data);
        return res;
    } catch(err) {
        console.error(err)
    }
};

export const getAdsByEmail = async email => {
    try {
        const ads = await axios.post(`${baseAPI}/advertisement/email`, {"email": email});
        return ads;
    } catch(err) {
        console.error(err);
    }
};

export const deleteAd = async id => {
    try {
        const res = await axios.delete(`${baseAPI}/advertisement/${id}`);
        return res;
    } catch(err) {
        console.error(err);
    }
};

export const editAd = async ad => {
    try {
        const res = await axios.put(`${baseAPI}/advertisement`, {"ad": ad});
        return res;
    } catch(err) {
        console.error(err);
    }
};