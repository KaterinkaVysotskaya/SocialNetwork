import {Button} from "antd"
import {useEffect, useState} from "react";
type ChatMessageType =  {
    message: string
    photo: string
    userId: number
    userName: string
}
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
        </div>
}


export const Chat: React.FC = () => {

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

export const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            let newMessages = JSON.parse( e.data)
            setMessages((prevMessages) => [...prevMessages,...newMessages])
        })
    }, [])
    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

export const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
        <img style={{width: '50px', height: '50px'}} src={message.photo} alt=""/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
export const AddMessageForm: React.FC = () => {
   const  [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <Button onClick={sendMessage}>Send</Button>
        </div>
    </div>
}

export default ChatPage