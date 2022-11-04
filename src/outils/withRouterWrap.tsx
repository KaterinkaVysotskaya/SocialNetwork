import {useParams} from "react-router-dom";
import React from "react";
import ProfileContainer from "../components/Profile/ProfileContainer";

export const WithRouterWrap = () => {
    let {userId} = useParams();
    return <ProfileContainer userId={userId}/>
}