import React from 'react';
import { connect } from 'react-redux';
import {  profileActions } from "../../../redux/profile-reducer";
import { AppStateType } from '../../../redux/redux-store';
import MyPosts, {DispatchPropsType, MapPropsType} from './MyPosts';

let mapStateToProps = (state: AppStateType) =>{
  return {
    posts : state.profilePage.posts,
  }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {} ,AppStateType>(mapStateToProps,  {addPost: profileActions.addPostAC})(MyPosts)


export default MyPostsContainer;