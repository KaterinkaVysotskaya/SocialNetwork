import {Dispatch} from "redux"
import {profileAPI, usersAPI} from "../api/api"
import {ProfileType} from "../components/Profile/ProfileContainer"
import {ActionsType, PostType, StateType} from "./store"
import {AppStateType} from "./redux-store";
import {handleServerAppError, handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";


const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE'
const SET_STATUS = 'profilePage/SET_STATUS'
const SAVE_PHOTOS_SUCCESS = 'profilePage/SAVE_PHOTOS_SUCCESS'

export type initialStateType = {
    posts: Array<PostType>
    profile: null | ProfileType
    status: string
}

let initialState: initialStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
        {id: 3, message: "It's my second post", likesCount: 11},
        {id: 4, message: "It's my third post", likesCount: 11},

    ],
    profile: null,
    status: ''

}

const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 5,
                message: action.newPost,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case "DELETE-POST": {
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        case SET_USER_PROFILE : {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS : {
            return {
                ...state,
                status: action.status
            }
        }
        case  SAVE_PHOTOS_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile!,
                    photos: {
                        ...action.photos
                    }
                }
            }
        }
        default:
            return state
    }
}
export const addPostAC = (newPost: string) => {
    return {
        type: 'ADD-POST', newPost
    } as const
}
export const deletPostAC = (postId: number) => {
    return {
        type: 'DELETE-POST', postId
    } as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}
export const savePhotoSuccess = (photos:  {small: string, large: string}) => {
    return {
        type: SAVE_PHOTOS_SUCCESS,
        photos
    } as const
}


export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
   try {
       let response = await profileAPI.updateStatus(status)
       if (response.data.resultCode === 0) {
           dispatch(setStatus(status))
       } else {
           handleServerAppError(response.data, dispatch)
       }
   } catch (e) {
       if (axios.isAxiosError(e)) {
           handleServerNetworkError(e, dispatch)
       }
   }
}
export const savePhoto = (file: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(getUserProfile(userId))
    } else {
        handleServerAppError(response.data, dispatch)
    }
}

export default profileReducer