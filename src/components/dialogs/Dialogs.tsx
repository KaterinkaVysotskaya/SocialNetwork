import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsType, MessageType, PhotosType} from "../../redux/state";

type DialogsPropsType = {
    dialogs: DialogsType[]
    messages: MessageType[]

}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} photo={d.photo}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message}/>)
    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}


export default Dialogs;