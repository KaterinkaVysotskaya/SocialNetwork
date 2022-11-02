import {Dispatch} from "redux"
import {updateObjectInArray} from "../outils/object-helpers";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {usersAPI} from "../api/usersAPI";

type PhotosType = {
    small: string
    large: string
}
export  type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string },
}

type initialStateType = typeof initialState

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as any []

}
type ThunkType = BaseThunkType<ActionsType>
const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'USERS/SET_USERS':
            return {...state, users: action.users}
        case 'USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}
        case 'USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

type ActionsType = InferActionsType<typeof usersActions>
export const usersActions = {
    followSuccessAC: (userId: number) => ({type: 'USERS/FOLLOW', userId}) as const,
    unfollowSuccessAC: (userId: number) => ({type: 'USERS/UNFOLLOW', userId}) as const,
    setUsersAC: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', users}) as const,
    setCurrentPageAC: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage}) as const,
    setTotalUsersCountAC: (totalUsersCount: number) => ({
        type: 'USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    }) as const,
    toggleIsFetchingAC: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching}) as const,
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    }) as const
}


export const getUsers = (page: number, pageSize: number):ThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(usersActions.toggleIsFetchingAC(true))
        dispatch(usersActions.setCurrentPageAC(page))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(usersActions.toggleIsFetchingAC(false))
        dispatch(usersActions.setUsersAC(data.items))
        dispatch(usersActions.setTotalUsersCountAC(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(usersActions.toggleFollowingProgressAC(true, userId))

    let data = await apiMethod(userId)
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleFollowingProgressAC(false, userId))

}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccessAC)
    }
}
export const unfollow = (userId: number) :ThunkType=> {
    return async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccessAC)
    }
}

export default usersReducer 