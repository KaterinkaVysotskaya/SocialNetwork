import {UserType} from "../redux/Users-reducer";
import {BaseResponseType, instance} from "./api";
import {AxiosResponse} from "axios";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<BaseResponseType>(`follow/${userId}`)
            .then(response => response.data)

    },
    unfollow(userId: number) {
        return instance.delete<BaseResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}
type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: null | string
}