import React from 'react'
import s from './../Dialogs.module.css'

type messagePropsType = {
    message: string
}
let sendMessage = React.createRef<HTMLTextAreaElement>()

const Message = (props: messagePropsType) => {
    return (
        <textarea ref={sendMessage}
                  className={s.message}>
                {props.message}
        </textarea>
    )


}

export default Message;