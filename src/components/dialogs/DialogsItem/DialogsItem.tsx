import React from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'

type dialogItemPropsType = {
    name: String
    id: number
    photo: string
}
const DialogItem = (props: dialogItemPropsType) => {
    return (
        <div className={s.dialog}>
            <div >
                <img className={s.photo} src={props.photo} alt=""/>
            </div >
            <NavLink className={s. navLink} to={'/dialogs/' + props.id}>{props.name}</NavLink>

        </div>
    )
}


export default DialogItem;