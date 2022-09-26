import {ResponseType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../redux/app-reducer";


export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) =>{
    dispatch(setAppErrorAC(error.message))
}

export const handleServerAppError = <T> (data: ResponseType<T>, dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occured'))
    }
    dispatch(setAppStatusAC('failed'))
}