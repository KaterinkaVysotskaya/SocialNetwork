import React from 'react'
import {  UserType } from '../../redux/Users-reducer'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: any []
}
const Users = React.memo((props: UsersPropsType) => {
    return (
            <div>
                <div>
                    <Paginator pageSize={props.pageSize}
                               totalUsersCount={props.totalUsersCount}
                               currentPage={props.currentPage}
                               onPageChanged={props.onPageChanged}/>
                </div>
                {props.users.map(u =><User user={u}
                                           follow={props.follow}
                                           followingInProgress={props.followingInProgress}
                                           unfollow={props.unfollow}/> )}
            </div>
    )
})

export default Users