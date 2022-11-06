import React from 'react'
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "../../redux/redux-store";
import {Users} from "./Users";

export const UsersPage:React.FC = () => {
    const isFetching = useAppSelector(state=>state.usersPage.isFetching)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    return(
        <div>
            {!isAuth && <Navigate to='/login'/>}
            {isFetching ? <CircularProgress/> : null}
            <Users />
        </div>
    )
}




