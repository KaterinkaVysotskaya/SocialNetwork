import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { PostType } from "../../../redux/state";

type MyPostsType = {
  newPostText: string
  posts: PostType[]
  addPost: (postMessage: string) => void
  updateNewPostText: (newText: string) => void
}

const MyPosts = (props: MyPostsType) => {

  let postsElements =
    props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  let addPost = () => {
    if (newPostElement.current) {
      props.addPost(newPostElement.current.value)
    }

  }
  let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    // let text = newPostElement.current?.value
    props.updateNewPostText(e.currentTarget.value)


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
          <button onClick={addPost} >Add post</button>
        </div>

      </div>
      <div className={s.posts}>
        {postsElements}

      </div>
    </div>
  )

}

export default MyPosts;