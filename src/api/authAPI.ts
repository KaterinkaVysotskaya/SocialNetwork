import {ResponseType} from "./api";
import {AxiosResponse} from "axios";
import {instance} from "./api";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: ''
}
export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string, }>>(`auth/me`)
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}