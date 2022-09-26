import {Dispatch} from "redux"
import {authAPI, LoginParamsType} from "../api/api"
import {ActionsType} from "./store"
import {handleServerAppError, handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {setAppStatusAC} from "./app-reducer";


type initialStateType = typeof initialState

const SET_USER_DATA = 'SET_USER_DATA'


let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
}

const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}
//ActionCreators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, data: {userId, email, login, isAuth}}) as const


//Thunks
export const getAuthUserData = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(response.data.data.id,
                    response.data.data.email,
                    response.data.data.login,
                    true))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
}
export const login = (data: LoginParamsType) =>  async(dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(getAuthUserData())
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}
export const logout = () =>  async(dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e){
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}


export default authReducer 