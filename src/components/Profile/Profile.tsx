import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import s from './Profile.module.css';
import { PostType} from "../../redux/state";

//   type PostType = {
//     id: number
//     message: string
//     likeCount: number
// }
 export type PostsType = Array<PostType>
type MyPostsType = {
    newPostText:string
    posts: PostType[]
    addPost: (postMessage: string) => void
    updateNewPostText: (newText: string) => void
}
const Profile = (props: MyPostsType) => {

    return <div>
    <ProfileInfo />
   <MyPosts posts={props.posts} 
            addPost={props.addPost}
            updateNewPostText={props.updateNewPostText}
            newPostText={props.newPostText}
            />
  </div>
}

export default Profile;