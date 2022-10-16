import React, {ChangeEvent} from 'react';
import {ProfileType} from './ProfileContainer';
import s from './ProfileInfo.module.css';
import {CircularProgress} from "@mui/material";
import ProfileStatus from "./ProfileStatus";
import userPhoto from '../../assets/images/user.png'
type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: any
}

const ProfileInfo = React.memo(({profile, updateStatus, status, isOwner, savePhoto}: ProfileInfoType) => {
    if (!profile) {
        return <CircularProgress/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) =>{
       if(e.target.files && e.target.files.length) {
           savePhoto(e.target.files[0])
       }
    }
    return (
        <div>
            <div>
                <img src='https://wowslider.com/sliders/demo-23/data1/images/hohenschwangau532864.jpg'/>
            </div>
            <div className={s.descriptionWrap}>
                <div className={s.descriptionBlock}>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                    {isOwner && <input type="file" name ='file' onChange={onMainPhotoSelected}/>}
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