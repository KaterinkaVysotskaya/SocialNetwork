import { Dispatch } from "redux"
import { profileAPI, usersAPI } from "../api/api"
import { ProfileType } from "../components/Profile/ProfileContainer"
import { ActionsType, PostType } from "./store"

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'


export type initialStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: null | ProfileType
    status: string
}

let initialState: initialStateType  =  {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 },
        { id: 3, message: "It's my second post", likesCount: 11 },
        { id: 4, message: "It's my third post", likesCount: 11 },

    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''
 
}

 const profileReducer = (state:initialStateType = initialState, action: ActionsType): initialStateType => {
     switch (action.type) {
        case 'ADD-POST': {
           let newPost: PostType = {
            id: 5,
            message: state.newPostText,
            likesCount: 0
        }
  
             return {
                 ...state, 
                posts: [...state.posts, newPost],
                newPostText: ''}
    }
        case 'UPDATE-NEW-POST-TEXT' : {
          return   {...state,
                    newPostText:action.newText }         
        }
        case SET_USER_PROFILE : {
          return   {...state,
                    profile: action.profile }         
        }
        case SET_STATUS : {
          return   {...state,
                    status: action.status }         
        }
          default:
              return state
        
     }
    }

  
export const addPostAC = () => {
    return {
        type: 'ADD-POST',
        // newPostElement: newPostElement
    } as const
}
export const UpdateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
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



export const getUserProfile = (userId: number) => (dispatch: Dispatch) =>{
    usersAPI.getProfile(userId)
    .then(response => {
        dispatch(setUserProfile(response.data))
    })
}
  
export const getStatus = (userId: number) => (dispatch: Dispatch) =>{
    profileAPI.getStatus(userId)
    .then(response => {
        debugger
            dispatch(setStatus(response.data))
    })
}
export const updateStatus = (status: string ) => (dispatch:  Dispatch) =>{
    profileAPI.updateStatus(status)
    .then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}
  
export default profileReducer