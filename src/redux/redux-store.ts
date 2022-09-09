import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./Users-reducer";
import thunkMiddleware from 'redux-thunk'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type AppStateType = ReturnType <typeof rootReducer>
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store