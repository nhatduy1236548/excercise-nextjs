import { AuthResponse } from "@/tyles/auth.type";
import http from "@/utils/http";

export const URL_LOGIN = 'login';
export const URL_REGISTER = 'register';
export const URL_GOOGLE = 'google/login';

const authApi = {
    registerAccount(body: {email:string; password: string}) {
        return http.post<AuthResponse>(URL_REGISTER, body);
    },
    login(body: {email:string; password: string}) {
        return http.post<AuthResponse>(URL_LOGIN, body);
    },
    loginGoogle() {
        return http.get(URL_GOOGLE);
    }
}

export default authApi;