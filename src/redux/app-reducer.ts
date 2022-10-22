import {Dispatch} from "redux";

import {handleServerAppError, handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {authAPI} from "../api/api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'
const APP_SET_INITIALISED = 'APP_SET_INITIALISED'

const initialState = {
    status: 'idle' as RequestStatusType,
    error:  null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state, error: action.error}
        case APP_SET_INITIALISED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
export const setAppStatusAC =(status: RequestStatusType)=>({type:APP_SET_STATUS, status} as const)

export const setAppErrorAC = (error: string | null) => ({type: APP_SET_ERROR, error} as const)

export const setAppIitialisedAC = (isInitialized: boolean) => ({type: APP_SET_INITIALISED, isInitialized} as const)

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.me()
        if (res.data.resultCode === 0) {
            // dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e){
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(setAppIitialisedAC(true))
        dispatch(setAppStatusAC('idle'))
    }
}

export type AppActionsType =
    |ReturnType <typeof setAppStatusAC>
    |ReturnType <typeof setAppErrorAC>
    |ReturnType <typeof setAppIitialisedAC>