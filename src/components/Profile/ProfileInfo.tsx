import React from 'react';
import Preloader from '../common/preloader/Preloader';
import { ProfileType } from './ProfileContainer';

import s from './ProfileInfo.module.css';
import ProfileStatusWithClass from './ProfileStatusWithClass';
import {CircularProgress} from "@mui/material";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
}

const ProfileInfo = React.memo((props: ProfileInfoType) => {

  if (!props.profile) {
    return <CircularProgress />
  }
console.log('props', props)
  return (
  
    <div >
        
      <div >
        <img src='https://wowslider.com/sliders/demo-23/data1/images/hohenschwangau532864.jpg' />
      </div>
      <div className={s.descriptionWrap}>
        <div className={s.descriptionBlock}>
          <img src={props.profile.photos.large} />

        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />

          <span>{props.profile.fullName}</span>
          <span>{props.profile.lookingForAJob}</span>
          <span>{props.profile.lookingForAJobDescription}</span>
        </div>

      </div>

    </div>
  )
})

export default ProfileInfo;