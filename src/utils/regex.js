export function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
};

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

export function validateResetToken(token) {
    const tokenRegex = /\b[0-9A-Z]{16}\b/gi;
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

export function validateCourseInput(courseInput) {
    const courseInputRegex = /^[a-zA-z]{3,4}( [0-9]{2,3}(L|H{1})?)?(-[0-9]{3})?$/;
    if (courseInputRegex.test(courseInput)) {
        return true;
    }
    return false;
};

export function validateName(name) {
    const nameRegex = /[^a-zA-Z]/;
    if (name.length !== 0 && !nameRegex.test(name)) {
        return true;
    }
    return false;
};

export function validatePhoneProfile(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    if (phone.length !== 0 && !phoneRegex.test(phone)) {
        return true;
    }
    return false;
};

export function validateEmailProfile(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length !== 0 && !emailRegex.test(email)) {
        return true;
    }
    return false;
};