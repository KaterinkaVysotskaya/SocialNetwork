import {Dispatch} from "redux";

import {handleServerAppError, handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {authAPI} from "../api/authAPI";
import {InferActionsType} from "./redux-store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof appActions>
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP_SET_STATUS':
            return {...state, status: action.status}
        case 'APP_SET_ERROR':
            return {...state, error: action.error}
        case 'APP_SET_INITIALISED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const appActions = {
    setAppStatusAC: (status: RequestStatusType) => ({type: 'APP_SET_STATUS', status} as const),
    setAppErrorAC: (error: string | null) => ({type: 'APP_SET_ERROR', error} as const),
    setAppIitialisedAC: (isInitialized: boolean) => ({type: 'APP_SET_INITIALISED', isInitialized} as const)
}


export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        let res = await authAPI.me()
        if (res.data.resultCode === 0) {
            // dispatch(setIsLoggedInAC(true))
            dispatch(appActions.setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(appActions.setAppIitialisedAC(true))
        dispatch(appActions.setAppStatusAC('idle'))
    }
}
