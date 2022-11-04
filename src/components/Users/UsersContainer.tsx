import React from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {FilterType, follow, getUsers, unfollow, UserType} from '../../redux/Users-reducer'
import Users from './Users'
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }
    onPageChanged(pageNumber: number) {
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize } = this.props
        this.props.getUsers(1, pageSize, filter)
    }
    render() {
        if (!this.props.isAuth) return <Navigate to='/login'/>
        return <>
            {this.props.isFetching ? <CircularProgress/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged.bind(this)}
                   onFilterChanged = {this.onFilterChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        filter: state.usersPage.filter
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    follow, unfollow, getUsers
})(UsersContainer)


