import axios, {AxiosResponse} from 'axios'
import {UserType} from "../redux/Users-reducer";
import {ProfileType} from "../components/Profile/ProfileContainer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '5fc11a34-7258-4926-8c00-915edb4f940c'
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
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<{status: string }, AxiosResponse<ResponseType>>('profile/status', {status: status})
    },
    savePhoto(photoType: string) {
        const formData: FormData = new FormData()
        formData.append('image', photoType)

        return instance.put<FormData, AxiosResponse<ResponseType<{photos: {small: string, large: string}}>>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'form/multipart'
            }
        })
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
