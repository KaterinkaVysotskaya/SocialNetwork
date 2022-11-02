import React, {ChangeEvent, useState} from 'react';
import {ProfileType} from './ProfileContainer';
import s from './ProfileInfo.module.css';
import {CircularProgress, Input} from "@mui/material";
import ProfileStatus from "./ProfileStatus";
import userPhoto from '../../assets/images/user.png';
import ProfileDataForm from "./ProfileDataForm";
import Button from "@mui/material/Button";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = React.memo(({profile, updateStatus, status, isOwner, savePhoto}: ProfileInfoType) => {
    const [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <CircularProgress/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const goToEditModeHandler = () =>{
        setEditMode(true)
    }
    return (
        <div>
            <div className={s.descriptionWrap}>
                <div className={s.descriptionBlock}>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                    {isOwner && <Input  type="file" name='file' onChange={onMainPhotoSelected}/>}
                    {editMode ? <ProfileDataForm profile={profile} setEditMode={setEditMode} /> : <ProfileData profile = {profile} isOwner={isOwner} goToEditMode={goToEditModeHandler}/>}
                    <ProfileStatus status={status} updateStatus={updateStatus}/>

                </div>

            </div>

        </div>
    )
})
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: ()=>void
}
const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return <div>
        <div>{isOwner && <Button onClick={goToEditMode}>edit</Button>}</div>
        <div>
            <b>Full name: </b>{profile.fullName}
        </div>
        <div>
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div>
            <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
        </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My profissional skills: </b> {profile.lookingForAJobDescription}
                </div>}
        <div>
            <b>Contacts: </b>{Object.keys(profile.contacts).map(key =>{
                return <Contacts key ={key} contactTitle={key} contactValue={profile.contacts[key as keyof typeof profile.contacts]}/>
        })}
        </div>
    </div>
}



type ContactsType = {
    contactTitle: string
    contactValue: string | null
}

const Contacts = ({contactTitle, contactValue}: ContactsType) =>{
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;