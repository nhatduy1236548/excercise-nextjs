import { User } from "@/tyles/user.type"
import { serialize } from "cookie"
import { NextApiResponse } from 'next';

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
    return result ? result : null;
}

export const setProfileToLS = (profile: string) => {
    localStorage.setItem('profile', profile);
}

export function setCookie(
    res: NextApiResponse,
    name: string,
    value: string,
    options: Record<string, any> = {}
  ): void {
    const cookie = serialize(name, value, options);
    res.setHeader('Set-Cookie', cookie);
  }

  export function deleteCookie(res: NextApiResponse, name:string) {
    setCookie(res, name, '', { maxAge: 0 });
  }