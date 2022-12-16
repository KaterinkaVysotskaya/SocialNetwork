export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void

let ws: WebSocket | null = null
let subscribers = [] as SubscriberType[]

const closeHandler = () => {
    console.log('WS closed')
    setTimeout(createChanel, 3000)
};
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
};
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
}
function createChanel() {
    cleanUp()
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}


export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers = []
        cleanUp()
        ws?.close()
    },
    subscribe (callback: SubscriberType)  {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s=>s !== callback)
        }
    },
    unsubscribe (callback: SubscriberType)  {
            subscribers = subscribers.filter(s=>s !== callback)
        },
    sendMessage (message: string) {
        ws?.send(message)
    }
}