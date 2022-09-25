import {Dispatch} from "redux"
import {authAPI, LoginParamsType} from "../api/api"
import {ActionsType} from "./store"


type initialStateType = typeof initialState

const SET_USER_DATA = 'SET_USER_DATA'


let initialState = {
    userId: 1,
    email: '',
    login: '',
    isAuth: false,
    isLoggedIn: false
}

const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
            case 'login/SET-IS-LOGGED-IN':
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state
    }
}
//ActionCreators
export const setUserData = (userId: number, email: string, login: string) =>
    ({type: SET_USER_DATA, data: {userId, email, login}}) as const
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//Thunks
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(response.data.data.id,
                    response.data.data.email,
                    response.data.data.login))
            }
        })
}
export const loginTC = (data: LoginParamsType) =>  async(dispatch: Dispatch) => {
    try{
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        }
    } catch (e) {
        console.log(e)
    }

}


export default authReducer 