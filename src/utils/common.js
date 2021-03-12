export function getRole(r) {
    const role = sessionStorage.getItem('role');
    if (role) role.toLowerCase();
    return (role === r.toLowerCase())
};
export function getUser() {
    return sessionStorage.getItem('user') || null;
};
export function getRoleLiteral() {
    return sessionStorage.getItem('role') || null;
};
export function getLoginStatus() {
    return (sessionStorage.getItem('role')&&sessionStorage.getItem('isVerified')&&sessionStorage.getItem('user'));
};
export function getIsVerified() {
    if (!sessionStorage.getItem('isVerified')) return null;
    if (sessionStorage.getItem('isVerified') === 'false'){
        return false;
    } else return true;
};
export function logout (){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('isVerified');
};
export function login (user,role,isVerified){
    sessionStorage.setItem('user',JSON.stringify(user));
    sessionStorage.setItem('role',role);
    sessionStorage.setItem('isVerified',isVerified);
};

export function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
};

export function capitalizeFirst(s){
    return s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()
};

export const zeroPad = (num, places) => String(num).padStart(places, '0');

export function validatePassword(password) {
    const length = /^[\s\S]{8,32}$/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const num = /[0-9]/;
    const specialChar = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    if (length.test(password) &&
        upperCase.test(password) &&
        lowerCase.test(password) &&
        num.test(password) &&
        specialChar.test(password)) {
        return true;
    }
    return false;
};

export function validateToken(token) {
    const tokenRegex = /\b[0-9A-Z]{8}\b/gi;
    if (tokenRegex.test(token)) {
        return true;
    }
    return false;
};

export function validatePasswordLiteral(password) {
    const length = /^[\s\S]{8,32}$/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const num = /[0-9]/;
    const specialChar = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    if (!length.test(password)){
        return "Minimum 8 Characters"
    }
    if (!upperCase.test(password)){
        return "Minimum One Capital Letter"
    }
    if (!lowerCase.test(password)){
        return "Minimum One Lowercase Letter"
    }
    if (!num.test(password)){
        return "Minimum One Number"
    }
    if (!specialChar.test(password)){
        return "Minimum One Special Character"
    }
    return '';
};

export function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(phone)) {
        return true;
    }
    return false;
};
