import {Button} from "antd"
import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType} from "../../api/chat-api";
import {useDispatch} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {useAppSelector} from "../../redux/redux-store";


export const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}


export const Chat: React.FC = () => {
    const status = useAppSelector(state => state.chat.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occured. Please refrash the page.</div>}
            <Messages/>
            <AddMessageForm/>
    </div>
}

export const Messages: React.FC = () => {
    const messages = useAppSelector(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll ] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(()=>{
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    },[messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    console.log('message')
    return <div>
        <img style={{width: '50px', height: '50px'}} src={message.photo} alt=""/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})
export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const status = useAppSelector(state => state.chat.status)
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>{
        if (e.key === 'Enter' && status === 'ready') {
            sendMessageHandler()
            setMessage('')
        }
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} onKeyUp={onKeyUpHandler}></textarea>
        </div>
        <div>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler} >Send</Button>
        </div>
    </div>
}

export default ChatPage