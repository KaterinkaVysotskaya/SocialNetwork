import {Dispatch} from "redux"
import {handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {appActions} from "./app-reducer";

type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof ChatActions>
type ThunkType = BaseThunkType<ActionsType>

type StatusType = 'pending' | 'ready';
let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}


const chatReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES-RECEIVED':
            return {...state,
                messages:[...state.messages, ...action.payload.messages]}
        case 'SN/chat/STATUS-CHANGED':
            return {...state,
                status: action.payload.status}
        default:
            return state
    }
}
//ActionCreators

export const ChatActions = {
    messagesReceived:  (messages: ChatMessageType[]) =>
        ({type: 'SN/chat/MESSAGES-RECEIVED', payload: {messages}}) as const,
    statusChanged:  (status: StatusType) =>
        ({type: 'SN/chat/STATUS-CHANGED', payload: {status}}) as const,
}

//Thunks
let _newMessageHandler: ((messages: ChatMessageType[]) => void )| null = null


const newMessageHandlerCreator = (dispatch: Dispatch)=> {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(ChatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        chatAPI.start()
        chatAPI.subscribe(newMessageHandlerCreator(dispatch))



        // const res = await authAPI.login(data)
        // if (res.data.resultCode === 0) {
        //     // @ts-ignore
        //     dispatch(getAuthUserData())
            dispatch(appActions.setAppStatusAC('succeeded'))
        // } else {
        //     if (res.data.resultCode === 10) {
        //         // @ts-ignore
        //         dispatch(getCaptchaUrl())
        //     }
        //     handleServerAppError(res.data, dispatch)
        // }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const stopMessagesListening = ():ThunkType => async (dispatch) =>{
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer