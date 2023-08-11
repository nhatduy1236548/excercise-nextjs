import config from "@/constants/config";
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from "./auth";
import { URL_LOGIN, URL_REGISTER } from "@/api/auth.api";
import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, HttpStatusCode, InternalAxiosRequestConfig, RawAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

class Http {
    instance: AxiosInstance;
    public accessToken: string;

    constructor() {
        this.accessToken = getAccessTokenFromLS() as string;
        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                console.log('request');
                console.log('request: '+config.baseURL)
                if (this.accessToken && config.headers) {
                    config.headers.authorization = 'Bearer ' +this.accessToken;
                    return config;
                }
                // Thêm phần kiểm tra nếu không có phương thức thì sử dụng GET
                console.log(config.method)
                if (!config.method) {
                    config.method = 'get';
                }
                return config
            },
            (error: AxiosError) => {
                console.log('error request: '+ error.config?.baseURL)
                return Promise.reject(error);
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                console.log(response);
                const {url} = response.config
                if (url == URL_LOGIN || url == URL_REGISTER) {
                    // const data = response.data as AuthResponse ;
                    this.accessToken = response.data.accessToken;
                    setAccessTokenToLS(this.accessToken);
                }
                return response
            },
            (error: AxiosError) => {
                console.log('error response: '+error.config);
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