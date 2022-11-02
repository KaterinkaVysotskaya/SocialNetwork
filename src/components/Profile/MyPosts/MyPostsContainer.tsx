import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {  profileActions } from "../../../redux/profile-reducer";
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';

let mapStateToProps = (state: AppStateType) =>{
  return {
    posts : state.profilePage.posts,
  }
}
let mapDispatchToProps = (dispatch: Dispatch) =>{
  return {
      addPost:(newPost: string)=>{
            dispatch(profileActions.addPostAC(newPost), )
      }
  }
}
const MyPostsContainer = connect(mapStateToProps,  mapDispatchToProps)(MyPosts)


export default MyPostsContainer;