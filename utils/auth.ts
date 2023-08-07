import { User } from "@/tyles/user.type"

export const LocalStorageEventTarget = new EventTarget()

export const clearLS = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    const clearLSEvent = new Event('clearLS')
    LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const setAccessTokenToLS = (access_token: string) => {
    localStorage.setItem('access_token', access_token);
}

export const getAccessTokenFromLS = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('access_token');
    } 
    return  '';
;};

export const getProfileFromLS = () => {
    let result ;
    if (typeof window !== 'undefined') {
        result = localStorage.getItem('profile');
    } 
    return result ? JSON.parse(result):null;
}

export const setProfileToLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile));
}