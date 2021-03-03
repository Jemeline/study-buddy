export function getRole(r) {
    const role = sessionStorage.getItem('role');
    // JSON.parse(sessionStorage.user).role;
    if (role) role.toLowerCase();
    return (role === r.toLowerCase())
};
export function getUser() {
    return sessionStorage.getItem('user') || null;
};
export function logout (){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
};
export function login (user,role){
    sessionStorage.setItem('user',JSON.stringify(user));
    sessionStorage.setItem('role',role);
};
