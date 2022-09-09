import React, { ChangeEvent } from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {  sendMessageAC,  UpdateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import { DialogsType, MessageType } from '../../redux/store';
import { Navigate } from 'react-router-dom';



type DialogsPropsType = {
    updateNewMessageBody: (body: any)=>void
    sendMessage: ()=>void
    dialogsPage:  {
        dialogs: DialogsType[]
        messages: MessageType[]
        newMessageBody: string
    }
    isAuth: boolean
}

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}photo={d.photo}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key = {m.id}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageClick = ()=> {
        props.sendMessage()

    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }
    

    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
               <div>
                   {messagesElements}
                </div> 
                <div>
                    <div><textarea value ={newMessageBody}
                                     placeholder='Enter your message'
                                     onChange = {onNewMessageChange}></textarea></div>
                    <div><button onClick={onSendMessageClick}>send</button></div>
                </div>
            </div>
        </div>
    )
}


export default Dialogs;