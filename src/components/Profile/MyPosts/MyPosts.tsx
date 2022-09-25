import React, { ChangeEvent } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {  PostType } from '../../../redux/store';
import {useFormik} from "formik";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

type MyPostsType = {
  posts: PostType[]
  addPost: (newPost: string)=>void
}

const MyPosts = (props: MyPostsType) => {
  const formik = useFormik({
    initialValues: {
      newPost: ''
    },
    onSubmit: values => {
      props.addPost(values.newPost)
    }})
  let postsElements =
    props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)


  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField type='textarea'
                     margin="normal"
                     placeholder='Enter your message'
                     {...formik.getFieldProps('newPost')}
          />

        </div>
        <div>
          <Button type={'submit'} variant={'contained'} color={'primary'} >Add post</Button>
        </div>

      </form>
      <div className={s.posts}>
        {postsElements}

      </div>
    </div>
  )

}

export default MyPosts;