import {Dispatch} from "redux"
import {ProfileType} from "../components/Profile/ProfileContainer"
import {PostType} from "./store"
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {handleServerAppError, handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {profileAPI} from "../api/profileAPI";


export type initialStateType = {
    posts: Array<PostType>
    profile: null | ProfileType
    status: string
}
type ActionsType = InferActionsType<typeof profileActions>
type ThunkType = BaseThunkType<ActionsType>
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
export const profileActions = {
    addPostAC: (newPost: string) => ({type: 'profilePage/ADD-POST', newPost} as const),
    deletPostAC: (postId: number) => ({type: 'profilePage/DELETE-POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profilePage/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profilePage/SET_STATUS', status} as const),
    savePhotoSuccess: (photos: { small: string, large: string }) => ({type: 'profilePage/SAVE_PHOTOS_SUCCESS', photos} as const)
}
const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'profilePage/ADD-POST': {
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
        case "profilePage/DELETE-POST": {
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        case "profilePage/SET_USER_PROFILE" : {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "profilePage/SET_STATUS" : {
            return {
                ...state,
                status: action.status
            }
        }
        case  "profilePage/SAVE_PHOTOS_SUCCESS": {
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


export const getUserProfile = (userId: number): ThunkType => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(response.data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(profileActions.setStatus(status))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(profileActions.savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: Dispatch, getState) => {
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