import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { follow , getUsers, setCurrentPageAC , unfollow , UserType } from '../../redux/Users-reducer'
import Users from './Users'
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

type MapStateToPropsType = {
    isAuth: boolean
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: any []
}

type MapDispatchToPropsType = {
    follow: (userId: number)=>void
    unfollow: (userId: number)=>void
    setCurrentPageAC: (pageNumber:number)=>void
    getUsers : (currentPage: number, pageSize: number) => void
}

 type PropsType =  MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize )
    }

    onPageChanged(pageNumber:number) {
        this.props.getUsers(pageNumber, this.props.pageSize )
        // this.props.setCurrentPageAC(pageNumber)
        // this.props.toggleIsFetchingAC(true)
     
        // // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
        // //     withCredentials: true
        // // })
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        // .then(data=>{
          
        // this.props.toggleIsFetchingAC(false)
        // this.props.setUsersAC(data.items) 
    // })
    }

    render () {
        if(!this.props.isAuth) return <Navigate to='/login'/>
      return <>
        {this.props.isFetching ? <CircularProgress/>: null}
      <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged.bind(this)}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    />
                    
    </>
}
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,  {
    follow, unfollow, setCurrentPageAC, getUsers
})(UsersContainer) 


