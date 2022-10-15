import React from 'react';
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { getStatus, getUserProfile, updateStatus } from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import Profile from './Profile';

export type ProfileType = {
    aboutMe: string
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


type MapStateToPropsType  = {
    profile: ProfileType | null
    isAuth: boolean
    status: string
    authorisedUserId: number | null
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string | number | null) => void
    getStatus: (userId: string| number | null) => string
    updateStatus: (status: string) => void
}

type PropsType = {
    userId?: string
}

type OwnPropsType =  MapStateToPropsType & MapDispatchToPropsType & PropsType


class ProfileContainer extends React.Component<OwnPropsType>{

    componentDidMount() {

    let userId = this.props.userId
        ? this.props.userId
        : this.props.authorisedUserId


    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
      
    }

    render() {
        if(!this.props.isAuth) return <Navigate to='/login'/>
        return (
            <>
                <Profile profile={this.props.profile} 
                            status={this.props.status}
                            updateStatus={this.props.updateStatus}/>
            </>
        )
    }
}

let AuthRedirectComponent = (props: any) => {
    if(!props.isAuth) return <Navigate to='/login'/>
    return <ProfileContainer {...props}/>
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    authorisedUserId: state.auth.userId,
    status: state.profilePage.status
})

export default connect(mapStateToProps, { getUserProfile, getStatus, updateStatus })(AuthRedirectComponent); 