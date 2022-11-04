import {ProfileType} from "../components/Profile/ProfileContainer";
import  {AxiosResponse} from "axios";
import {instance} from "./api";
import {BaseResponseType} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<{ status: string }, AxiosResponse<BaseResponseType>>('profile/status', {status: status})
    },
    savePhoto(photoType: File) {
        const formData: FormData = new FormData()
        formData.append('image', photoType)

        return instance.put<FormData, AxiosResponse<BaseResponseType<{ photos: { small: string, large: string } }>>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'form/multipart'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ProfileType, AxiosResponse<BaseResponseType>>('profile', profile)
    },
}