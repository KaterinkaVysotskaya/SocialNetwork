export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error';
type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

let ws: WebSocket | null = null
type EventsNamesType = 'message-received' | 'status-changed'
let subscribers = {
    'message-received': [] as MessageReceivedSubscriberType[],
    'status-changed' : [] as StatusChangedSubscriberType[]
}

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChanel, 3000)
};
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
};
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
};
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page')
};
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChanel() {
    cleanUp()
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe (eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType)  {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s=>s !== callback)
        }
    },
    unsubscribe (eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType)  {
            // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s=>s !== callback)
        },
    sendMessage (message: string) {
        ws?.send(message)
    }
}