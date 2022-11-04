import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '5fc11a34-7258-4926-8c00-915edb4f940c'
    }
})

export type BaseResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
