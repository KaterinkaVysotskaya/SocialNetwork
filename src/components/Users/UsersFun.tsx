import  axios from 'axios'
import React from 'react'
// import { UserType } from '../../redux/Users-reducer'
//
// type UsersPropsType = {
//     users: Array <UserType>
//     follow: (userId: number)=>void
//     unfollow: (userId: number)=>void
//     setUsers: (users: Array<UserType>)=>void
//     setUsersAC: (users: Array<UserType>) => void
//     unfollowAC: (id: number) => void
//     followAC: (id: number) => void
// }
// // [
// //     { id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnf8eOGp6TmOTD-uhITActxL0ptYKB_kM28w&usqp=CAU', followed: false, fullName: 'Katya', status: 'I am goddess', location: {city: 'Minsk', country: 'Belarus'} },
// //     { id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&usqp=CAU', followed: true, fullName: 'Arina', status: 'I am goddess too', location: {city: 'Minsk', country: 'Belarus'} },
// //     { id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FcYGoYWqVnEb-q4md_15Yjz-AY6Si689YA&usqp=CAU', followed: false, fullName: 'Milana', status: 'And me!', location: {city: 'Minsk', country: 'Belarus'} },
// //     { id: 4, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM74j9qX_2xFck61A3p1DoOBqKNQr3RXBfSQ&usqp=CAU', followed: false, fullName: 'Olay', status: 'Just Olay', location: {city: 'Minsk', country: 'Belarus'} },
// //  ]
//
// const Users =(props: UsersPropsType)=> {
//     let getUsers = () => {
//     if (props.users.length === 0) {
//
//             axios.get('https://social-network.samuraijs.com/api/1.0/users')
//                 .then(response=>{
//                 props.setUsersAC(response.data.items)
//             })
//         }
//     }
//
//     return (
//         <div>
//             <button onClick ={getUsers}>Get users</button>
//             {props.users.map( u  => <div key={u.id}>
//                 <span>
//                     <div>
//                         {/* <img src = {u.photos.small !=null ? u.photos.small : userPhoto } className={s.userPhoto} /> */}
//                     </div>
//                      <div>
//                          { u.followed
//                          ? <button onClick = {()=>{props.unfollowAC(u.id)}}>Unfollow</button>
//                          : <button onClick = {()=>{props.followAC(u.id)}}>Follow</button>
//                         }
//                      </div>
//                 </span>
//                 <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                 </span>
//                     <span>
//                         <div>{'u.location.country'}</div>
//                         <div>{'u.location.city'}</div>
//                     </span>
//                 </span>
//             </div>)}
//         </div>
//     )
// }
//
// export default Users