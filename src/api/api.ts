import axios, {AxiosResponse} from 'axios'
import {UserType} from "../redux/Users-reducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '8279af8e-dc48-4d81-9f8e-87032e2da4dd'
    }
})
 type GetUsersResponseType = {
     items: UserType[]
     totalCount: number
     error: null | string
}

 export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)

    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number)  {
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId)
    }
}


export const profileAPI = {
    getProfile(userId: number)  {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<{status: string }, AxiosResponse<ResponseType>>('profile/status', {status: status})
    }


}
export const authAPI = {
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string} >>(`auth/me`)
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}
