import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppStateType } from '../redux/redux-store'

type MapStateToPropsType  = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect <T> (Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
       
            let {isAuth, ...restProps} = props
            if(!isAuth) return  <Navigate to={'/login'} />
          return <Component {...restProps as T}/>
        
    }
    let ConnectedAuthRedirectComponent = connect (mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}