import {Dispatch} from "redux"
import {handleServerAppError, handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {authAPI, LoginParamsType} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {appActions} from "./app-reducer";

type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof AuthActions>
type ThunkType = BaseThunkType<ActionsType>

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string// if null then captcha is not required
}


const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}
//ActionCreators

export const AuthActions = {
    setAuthUserData:  (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({type: 'SET_USER_DATA', data: {userId, email, login, isAuth}}) as const,
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({type: 'GET_CAPTCHA_URL_SUCCESS', data: {captchaUrl}}) as const
}

//Thunks
export const getAuthUserData = (): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(AuthActions.setAuthUserData(response.data.data.id,
            response.data.data.email,
            response.data.data.login,
            true))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
}
export const login = (data: LoginParamsType): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(getAuthUserData())
            dispatch(appActions.setAppStatusAC('succeeded'))
        } else {
            if (res.data.resultCode === 10) {
                // @ts-ignore
                dispatch(getCaptchaUrl())
            }
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}
export const logout = (): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(AuthActions.setAuthUserData(null, null, null, false))
            dispatch(appActions.setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}
export const getCaptchaUrl = (): ThunkType =>async (dispatch: Dispatch) => {
    try {
        const res = await securityAPI.getCaptchaUrl()
        const captchaUrl = res.data.url
        dispatch(AuthActions.getCaptchaUrlSuccess(captchaUrl))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export default authReducer 