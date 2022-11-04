import {AppStateType} from "../../redux/redux-store";
import {createSelector} from "reselect";


const getIsAuthSelector = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getIsAuth = createSelector(getIsAuthSelector,(isAuth: boolean)=>{
    return isAuth
})

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

// export const getUsersSuperSelector = (getUsersSelector, (users:Array<UserType>) =>{
//     return users.filter(u=>true)
// })