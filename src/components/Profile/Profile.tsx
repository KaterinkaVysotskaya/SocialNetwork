import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import s from './Profile.module.css';
import { ActionsType, PostType, StoreType } from "../../redux/store";
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileContainer';

//   type PostType = {
//     id: number
//     message: string
//     likeCount: number
// }
export type PostsType = Array<PostType>

export type ProfilePropsType = {
    profile: ProfileType | null
    status: any
    updateStatus: (status: string) => void
}

const Profile = (props: ProfilePropsType) => {

    return <div>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer />
    </div>
}

export default Profile; 