import {Dispatch} from "redux"
import {handleServerNetworkError} from "../outils/error-utils";
import axios from "axios";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {appActions} from "./app-reducer";
import {v1} from "uuid"

type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof ChatActions>
type ThunkType = BaseThunkType<ActionsType>


type ChatMessageType = ChatMessageAPIType & {id: string}
let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}


const chatReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES-RECEIVED':
            return {...state,
                messages:[...state.messages, ...action.payload.messages.map(m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)}
        case 'SN/chat/STATUS-CHANGED':
            return {...state,
                status: action.payload.status}
        default:
            return state
    }
}
//ActionCreators

export const ChatActions = {
    messagesReceived:  (messages: ChatMessageAPIType[]) =>
        ({type: 'SN/chat/MESSAGES-RECEIVED', payload: {messages}}) as const,
    statusChanged:  (status: StatusType) =>
        ({type: 'SN/chat/STATUS-CHANGED', payload: {status}}) as const,
}

//Thunks
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void )| null = null

const newMessageHandlerCreator = (dispatch: Dispatch)=> {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(ChatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
};
let _statusChangedHandler: ((status: StatusType) => void )| null = null

const statusChangedHandlerCreator = (dispatch: Dispatch)=> {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(ChatActions.statusChanged(status))
        }
    }
    return _statusChangedHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))



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
    chatAPI.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer