export function getRole(r) {
    const role = sessionStorage.getItem('role');
    // JSON.parse(sessionStorage.user).role;
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
