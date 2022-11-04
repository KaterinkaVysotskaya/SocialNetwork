import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UserType} from '../../redux/Users-reducer'
import {NavLink} from 'react-router-dom'
import Button from "@mui/material/Button";

type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number []
}
const User = React.memo(({user, followingInProgress, follow, unfollow}: UserPropsType) => {
    return (
            <div>
                <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img alt='userPhoto' src={user.photos.small != null ? user.photos.small : userPhoto}
                                     className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <Button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}> Unfollow</Button>

                                : <Button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>Follow</Button>
                            }
                        </div>
                    </span>
                    <span>
                        <span><div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>
            </div>
    )
})

export default User