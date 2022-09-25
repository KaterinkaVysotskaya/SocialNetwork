import React from 'react'
import s from './../Dialogs.module.css'

type messagePropsType = {
    message: string
}
let sendMessage = React.createRef<HTMLTextAreaElement>()

let addMessage = () => {
    let text = sendMessage.current?.value
    alert(text)
}

const Message = (props: messagePropsType) => {
    return (
        <>
        <textarea ref={sendMessage}
                  className={s.message}>
                {props.message}
            </textarea>
        {/*<button onClick={addMessage}>send</button>*/}
        </>
    )


}

export default Message;