import {Dispatch} from "redux"
import {authAPI} from "../api/api"
import {ActionsType, PostType} from "./store"


type initialStateType = typeof initialState

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    userId: 1,
    email: '',
    login: '',
    isAuth: false

}

const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setUserData = (userId: number, email: string, login: string) =>
    ({type: SET_USER_DATA, data: {userId, email, login}}) as const
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(response.data.data.id,
                    response.data.data.email,
                    response.data.data.login))
            }
        })
}


export default authReducer 