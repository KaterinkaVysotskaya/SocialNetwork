import React from 'react'
import {FilterType, UserType} from '../../redux/Users-reducer'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm/UsersSearchForm";

type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number []
    onFilterChanged: (filter: FilterType) => void
}
const Users = React.memo((props: UsersPropsType) => {
    return (
            <div>
                <div>
                    <Paginator pageSize={props.pageSize}
                               totalItemsCount={props.totalUsersCount}
                               currentPage={props.currentPage}
                               onPageChanged={props.onPageChanged}
                                />
                </div>
                {props.users.map(u =><User user={u}
                                           follow={props.follow}
                                           followingInProgress={props.followingInProgress}
                                           unfollow={props.unfollow}

                /> )}
                <UsersSearchForm onFilterChanged={props.onFilterChanged} />
            </div>
    )
})

export default Users