import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {  addPostAC, UpdateNewPostTextAC } from "../../../redux/profile-reducer";
import { ActionsType, PostType } from '../../../redux/store';

type MyPostsType = {
  newPostText: string
  posts: PostType[]
  updateNewPostText: (text: any)=>void
  addPost: ()=>void
}

const MyPosts = (props: MyPostsType) => {

  let postsElements =
    props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  let onAddPost = () => {
    if (newPostElement.current) {
      props.addPost()
    }

  }
  let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    let text = newPostElement.current?.value
    props.updateNewPostText(text)


  }

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange}
                     ref={newPostElement}
                      value={props.newPostText} />

        </div>
        <div>
          <button onClick={onAddPost} >Add post</button>
        </div>

      </div>
      <div className={s.posts}>
        {postsElements}

      </div>
    </div>
  )

}

export default MyPosts;