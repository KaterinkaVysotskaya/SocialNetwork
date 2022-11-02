import {Dispatch} from "redux";
import {appActions} from "../redux/app-reducer";
import {ResponseType} from "../api/api";


export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) =>{
    dispatch(appActions.setAppErrorAC(error.message))
}

export const handleServerAppError = <T> (data: ResponseType<T>, dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppErrorAC(data.messages[0]))
    } else {
        dispatch(appActions.setAppErrorAC('some error occured'))
    }
    dispatch(appActions.setAppStatusAC('failed'))
}