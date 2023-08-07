import config from "@/constants/config";
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from "./auth";
import { URL_LOGIN, URL_REGISTER } from "@/api/auth.api";
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { AuthResponse } from "@/tyles/auth.type";

class Http {
    instance: AxiosInstance;
    private accessToken: string;

    constructor() {
        this.accessToken = getAccessTokenFromLS() as string;
        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 60 * 60 * 24,
                'expire-refresh-token': 60 * 60 * 24 * 160
            }
        })

        this.instance.interceptors.request.use(
            (config) => {
                console.log('sending');
                console.log(config.url);
            if (this.accessToken && config.headers) {
                config.headers.authorization = this.accessToken;
                return config;
            }
            console.log('url: '+config.url);
            console.log('đã gửi');
            return config
        },
            (error: AxiosError) => {
                console.log('lỗi ở request');
                return Promise.reject(error);
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                console.log('response: '+response);
                const {url} = response.config
                if (url === URL_LOGIN || url === URL_REGISTER) {
                    const data = response.data as AuthResponse ;
                    this.accessToken = data.data.access_token;
                    setAccessTokenToLS(this.accessToken);
                }
                return response
            },
            (error: AxiosError) => {
                console.log('lỗi ở response: '+error);
                if (
                    ! [HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
                ) {
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message);
                }
                return Promise.reject(error);
            }
        )
    }
}

const http = new Http().instance
export default http