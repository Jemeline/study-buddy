import axios from 'axios';

export async function apiLogin(userData) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app/api/user/login', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiRegister(userData) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app3/api/user/register', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiVerify(userData) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app4/api/token/verify', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};

export async function apiToken(userData) {
    try {
        const res = await axios.post('https://us-central1-study-buddy-d452c.cloudfunctions.net/app4/api/token', userData);
        return res;
    } catch (error){
        console.log(error.response);
        throw error;
    }    
};