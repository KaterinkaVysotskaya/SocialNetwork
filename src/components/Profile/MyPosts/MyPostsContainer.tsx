import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {  addPostAC, initialStateType, UpdateNewPostTextAC } from "../../../redux/profile-reducer";
import { AppStateType } from '../../../redux/redux-store';
import { ActionsType, PostType, StoreType } from '../../../redux/store';
import MyPosts from './MyPosts';

type mapDispatchToPropsType = {
  updateNewPostText: (text: any)=>void
  addPost: ()=>void
}


let mapStateToProps = (state: AppStateType) =>{
  return {
    posts : state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch: Dispatch) =>{
  return {
    updateNewPostText:(text: any)=>{
      dispatch(UpdateNewPostTextAC(text))
      },
      addPost:()=>{
            dispatch(addPostAC(), )
      }
  }
}

const MyPostsContainer = connect(mapStateToProps,  mapDispatchToProps)(MyPosts)


export default MyPostsContainer;