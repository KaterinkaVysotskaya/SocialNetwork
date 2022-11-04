import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsType, MessageType} from '../../redux/store';
import {useFormik} from "formik";
import {TextField} from '@mui/material';
import Button from "@mui/material/Button";

type DialogsPropsType = {
    updateNewMessageBody: (body: any) => void
    sendMessage: (values: string) => void
    dialogsPage: {
        dialogs: DialogsType[]
        messages: MessageType[]
        newMessageBody: string
    }
}

const Dialogs = (props: DialogsPropsType) => {
    const formik = useFormik({
        initialValues: {
            newMessageBody: ''
        },
        onSubmit: values => {
            props.sendMessage(values.newMessageBody)
            formik.resetForm()
        }
    })
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} photo={d.photo}/>);

    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            type='textarea'
                            margin="normal"
                            placeholder='Enter your message'
                            {...formik.getFieldProps('newMessageBody')}
                        ></TextField>
                    </div>
                    <div>
                        <Button
                            type={'submit'} variant={'contained'} color={'primary'}>
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Dialogs;