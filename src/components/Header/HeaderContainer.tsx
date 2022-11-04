import React from 'react';
import Header from './Header';
import { AppStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {getAuthUserData, logout} from '../../redux/auth-reducer';


class HeaderContainer extends React.Component <HeaderPropsType> {
  componentDidMount() {
    this.props.getAuthUserData()
  }

  render() {
    return <Header{...this.props}/>
}
  }
export type HeaderPropsType =  MapStateToPropsType &  MapDispatchToPropsType
type MapStateToPropsType = {
  isAuth: boolean
  login: string | null
  email?: string
  id?: number
}
type MapDispatchToPropsType = {
  getAuthUserData:() => void
  logout:()=>void
}  

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType > (mapStateToProps, {getAuthUserData, logout}) (HeaderContainer);