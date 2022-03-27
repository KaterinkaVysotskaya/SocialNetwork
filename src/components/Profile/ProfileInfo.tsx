import React from 'react';
import s from './ProfileInfo.module.css';
const ProfileInfo = () => {
  return (
  <div>
    <div>
      <img src='https://wowslider.com/sliders/demo-23/data1/images/hohenschwangau532864.jpg' />
    </div>
    <div className={s.descriptionBlock}>
      ava+descr
    </div>
  </div>
  )
}

export default ProfileInfo;