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
export function getIsSurveyed() {
    if (!sessionStorage.getItem('isSurveyed')) return null;
    if (sessionStorage.getItem('isSurveyed') === 'false'){
        return false;
    } else return true;
};

export function logout (){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('isVerified');
    sessionStorage.removeItem('isSurveyed');
    sessionStorage.removeItem('graduationYear');
    sessionStorage.removeItem('studentType');
    sessionStorage.removeItem('major');
    sessionStorage.removeItem('minor');
    sessionStorage.removeItem('graduatePOS');
    sessionStorage.removeItem('currPage');
    sessionStorage.removeItem('courseSchedule');
    sessionStorage.removeItem('learningType');

};
export function login (user,role,isVerified,isSurveyed){
    sessionStorage.setItem('user',JSON.stringify(user));
    sessionStorage.setItem('role',role);
    sessionStorage.setItem('isVerified',isVerified);
    sessionStorage.setItem('isSurveyed',isSurveyed);
};

export function capitalizeFirst(s){
    return s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()
};

export const zeroPad = (num, places) => String(num).padStart(places, '0');





