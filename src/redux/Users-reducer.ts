import { Dispatch } from "redux"
import { usersAPI } from "../api/api"
import { ActionsType, PostType } from "./store"

// followed: false
// id: 23850
// name: "yura_react"
// photos: {small: null, large: null}
// status: null
// uniqueUrlName: null

type PhotosType = {
    small: string
    large: string
}

export  type UserType ={
     id: number
     photos: PhotosType
     followed: boolean
     name: string
     status: string
     location: {city: string , country: string}, 
 }

type initialStateType = typeof initialState


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE='SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState  =  {
    users: [
        // { id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnf8eOGp6TmOTD-uhITActxL0ptYKB_kM28w&usqp=CAU', followed: false, fullName: 'Katya', status: 'I am goddess', location: {city: 'Minsk', country: 'Belarus'} },
        // { id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&usqp=CAU', followed: true, fullName: 'Arina', status: 'I am goddess too', location: {city: 'Minsk', country: 'Belarus'} },
        // { id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FcYGoYWqVnEb-q4md_15Yjz-AY6Si689YA&usqp=CAU', followed: false, fullName: 'Milana', status: 'And me!', location: {city: 'Minsk', country: 'Belarus'} },
        // { id: 4, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM74j9qX_2xFck61A3p1DoOBqKNQr3RXBfSQ&usqp=CAU', followed: false, fullName: 'Olay', status: 'Just Olay', location: {city: 'Minsk', country: 'Belarus'} },
        

    ] as Array <UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress:[]  as any []
 
}

 const usersReducer = (state:initialStateType = initialState, action: ActionsType): initialStateType => {
     switch (action.type) {
       case FOLLOW:
           return { 
              
               ...state,
               users: state.users.map(u=> {
                   if (u.id === action.userId) {
                       return {...u, followed: true}
                   }
                   return u
               })
           }
           case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u=> {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
            case SET_USERS:

                return {...state, users: action.users}
            case SET_CURRENT_PAGE:
                return {...state, currentPage: action.currentPage}
            case SET_TOTAL_USERS_COUNT:
                return {...state, totalUsersCount: action.count}
            case TOGGLE_IS_FETCHING:
                return {...state, isFetching: action.isFetching}
            case TOGGLE_IS_FOLLOWING_PROGRESS:
                return {...state, 
                    followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
                }
            
          default:
              return state
        
     }
    }

  
export const followSuccessAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowSuccessAC =(userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC =(users: Array<UserType>) => ({type: SET_USERS, users}) as const
export const setCurrentPageAC =(currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCountAC =(totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}) as const
export const toggleIsFetchingAC =(isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const toggleFollowingProgressAC =(isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}) as const


export const getUsers = (page: number, pageSize: number ) =>{
  return  (dispatch: Dispatch) =>{
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(page))

        usersAPI.getUsers(page, pageSize)
                .then(data=>{
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(data.items)) 
                dispatch(setTotalUsersCountAC(data.totalCount)) 
            })
    }
}
export const follow = (userId: number ) =>{
  return  (dispatch: Dispatch) =>{
    dispatch(toggleFollowingProgressAC(true, userId))

    usersAPI.follow(userId)
        .then(data => {
            if (data.resultCode == 0) {
                dispatch(followSuccessAC(userId))
            }
            dispatch(toggleFollowingProgressAC(false, userId))

        })
    }
}
export const unfollow = (userId: number ) =>{
  return  (dispatch: Dispatch) =>{
    dispatch(toggleFollowingProgressAC(true, userId))

    usersAPI.unfollow(userId)
        .then(data => {
            if (data.resultCode == 0) {
                dispatch(unfollowSuccessAC(userId))
            }
            dispatch(toggleFollowingProgressAC(false, userId))

        })
    }
}

export default usersReducer 