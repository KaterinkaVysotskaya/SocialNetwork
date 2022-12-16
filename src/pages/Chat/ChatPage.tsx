import {Button} from "antd"
import {useEffect, useState} from "react";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {useAppSelector} from "../../redux/redux-store";


export const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}


export const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

export const Messages: React.FC = () => {
    const messages = useAppSelector(state=>state.chat.messages)
    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img style={{width: '50px', height: '50px'}} src={message.photo} alt=""/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
export const AddMessageForm: React.FC= () => {
    const [message, setMessage] = useState('')
    const status = useAppSelector(state=>state.chat.status)
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        sendMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
        </div>
    </div>
}

export default ChatPage