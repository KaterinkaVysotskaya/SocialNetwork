import {DialogsType, MessageType} from "./store"
import {InferActionsType} from "./redux-store";

type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof dialogsActions>

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych', photo: 'https://wallpaperaccess.com/full/1137909.jpg'},
        {id: 2, name: 'Andrew', photo: 'https://w-dog.ru/wallpapers/1/0/486999962535069/revolyucioner-kak-simvol-svobody-i-silnogo-duxa.jpg'},
        {id: 3, name: 'Denis', photo: 'http://media.filmz.ru/photos/full/f_102338.jpg'},
        {id: 4, name: 'Sacha', photo: 'http://fanhair.ru/wp-content/uploads/2018/07/10.jpg'},
        {id: 5, name: 'Victor', photo: 'https://i.pinimg.com/736x/3c/ec/d8/3cecd89ac384bbbea155b3a12c38f855--gabriel-aubry-boss-black.jpg'},
        {id: 6, name: 'Valera', photo: 'https://avatars.photodoska.ru/upload/23-11-17/7facdadcf2f82169ff799dce5951794d.jpeg'},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Will you be mine?'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Hi'},
        {id: 6, message: 'Hi'},
    ] as Array<MessageType>,
}

const dialogsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE' :
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}]
            }
        default:
            return state
    }
}
export const dialogsActions = {
    sendMessageAC: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody})as const
}

export default dialogsReducer