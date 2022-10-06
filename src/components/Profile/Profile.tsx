import React from 'react';
import ProfileInfo from './ProfileInfo';
import { PostType } from "../../redux/store";
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
    status: string
    updateStatus: (status: string) => void
}

const Profile = React.memo((props: ProfilePropsType) => {

    return <div>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer />
    </div>
})

export default Profile; 