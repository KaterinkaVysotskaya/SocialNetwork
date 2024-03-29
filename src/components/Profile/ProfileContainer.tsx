import React from 'react';
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';
import {getStatus, getUserProfile, savePhoto, updateStatus} from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import Profile from './Profile';

export type ProfileType = {
    aboutMe: string | null
    contacts: {
        facebook: string
        website: null | string
        vk: string
        twitter: string
        instagram: string
        youtube: null | string
        github: string
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    getUserProfile: (userId: string | number | null) => void
    getStatus: (userId: string| number | null) => string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}
type PropsType = {
    userId?: string
}
type OwnPropsType =  MapStateToPropsType & MapDispatchToPropsType & PropsType

class ProfileContainer extends React.Component<OwnPropsType>{
    refrechProfile() {
        let userId = this.props.userId
            ? this.props.userId
            : this.props.authorisedUserId

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refrechProfile()
    }
    componentDidUpdate(prevProps: Readonly<OwnPropsType>, prevState: Readonly<{}>) {
        if (this.props.userId != prevProps.userId) {
            this.refrechProfile()
        }
    }

    render() {
        return (
                <Profile profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         isOwner={!this.props.userId}
                         savePhoto={this.props.savePhoto}
                />
        )
    }
}

let AuthRedirectComponent = (props: any) => {
    if(!props.isAuth) return <Navigate to='/login'/>
    return <ProfileContainer {...props}/>
}


let mapStateToProps = (state: AppStateType)=> ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    authorisedUserId: state.auth.userId,
    status: state.profilePage.status
})

export default  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus,savePhoto })
(AuthRedirectComponent);