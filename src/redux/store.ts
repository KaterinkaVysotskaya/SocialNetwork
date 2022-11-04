import {AnyAction} from "redux";


let store: StoreType = {
    _state: { 
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 12 },
                { id: 2, message: "It's my first post", likesCount: 11 },
                { id: 3, message: "It's my second post", likesCount: 11 },
                { id: 4, message: "It's my third post", likesCount: 11 },

            ],
            newPostText: 'it-kamasutra.com',
            profile: null

        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimych', photo: 'https://wallpaperaccess.com/full/1137909.jpg' },
                {
                    id: 2,
                    name: 'Andrew',
                    photo: 'https://w-dog.ru/wallpapers/1/0/486999962535069/revolyucioner-kak-simvol-svobody-i-silnogo-duxa.jpg'
                },
                { id: 3, name: 'Denis', photo: 'http://media.filmz.ru/photos/full/f_102338.jpg' },
                { id: 4, name: 'Sacha', photo: 'http://fanhair.ru/wp-content/uploads/2018/07/10.jpg' },
                {
                    id: 5,
                    name: 'Victor',
                    photo: 'https://i.pinimg.com/736x/3c/ec/d8/3cecd89ac384bbbea155b3a12c38f855--gabriel-aubry-boss-black.jpg'
                },
                {
                    id: 6,
                    name: 'Valera',
                    photo: 'https://avatars.photodoska.ru/upload/23-11-17/7facdadcf2f82169ff799dce5951794d.jpeg'
                },
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How are you' },
                { id: 3, message: 'Will you be mine?' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Hi' },
                { id: 6, message: 'Hi' },
            ]
        }

    },
    _callSubscriber: () => {
        console.log('State was chanched');

    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },


    // addPost() {
    //     let newPost: PostType = {
    //         id: 5,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     }
    //     this._state.profilePage.posts.push(newPost)
    //     this._state.profilePage.newPostText = ''
    //     this._callSubscriber()

    // },
    // updateNewPostText(newText) {

    //     this._state.profilePage.newPostText = newText
    //     this._callSubscriber()

    // },

    dispatch(action) {

        // this._state.profilePage = profileReducer(this._state.profilePage, action)
        // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._callSubscriber()

    }
}

// export type ActionsType = ReturnType<typeof addPostAC> |
//                           ReturnType<typeof sendMessageAC> |
//                           ReturnType<typeof followSuccessAC> |
//                           ReturnType<typeof unfollowSuccessAC> |
//                           ReturnType<typeof setUsersAC> |
//                           ReturnType<typeof setCurrentPageAC> |
//                           ReturnType<typeof setTotalUsersCountAC> |
//                           ReturnType<typeof toggleIsFetchingAC> |
//                           ReturnType<typeof setUserProfile> |
//                           ReturnType<typeof setAuthUserData> |
//                           ReturnType<typeof toggleFollowingProgressAC > |
//                           ReturnType<typeof setStatus > |
//                           ReturnType<typeof deletPostAC >|
//                           ReturnType<typeof savePhotoSuccess >|
//                           ReturnType<typeof getCaptchaUrlSuccess >
//
//

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: AnyAction) => void



}

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsType = {
    id: number
    name: string
    photo: string
}
export type MessageType = {
    id: number
    message: string
}
export type StateType = {
    profilePage: {
        posts: PostType[]
        newPostText: string
        profile: null
    }
    dialogsPage: {
        dialogs: DialogsType[]
        messages: MessageType[]
    }
}
export default store;




