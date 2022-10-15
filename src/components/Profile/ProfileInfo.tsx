import React from 'react';
import {ProfileType} from './ProfileContainer';
import s from './ProfileInfo.module.css';
import {CircularProgress} from "@mui/material";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = React.memo(({profile, updateStatus, status}: ProfileInfoType) => {

    if (!profile) {
        return <CircularProgress/>
    }
    return (
        <div>
            <div>
                <img src='https://wowslider.com/sliders/demo-23/data1/images/hohenschwangau532864.jpg'/>
            </div>
            <div className={s.descriptionWrap}>
                <div className={s.descriptionBlock}>
                    <img src={profile.photos.large}/>

                    <ProfileStatus status={status} updateStatus={updateStatus}/>

                    <span>{profile.fullName}</span>
                    <span>{profile.lookingForAJob}</span>
                    <span>{profile.lookingForAJobDescription}</span>
                </div>

            </div>

        </div>
    )
})

export default ProfileInfo;