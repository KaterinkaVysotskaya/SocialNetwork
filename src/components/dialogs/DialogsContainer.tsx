import React, { ComponentType } from 'react'
import { sendMessageAC } from "../../redux/dialogs-reducer";
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { compose, Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

let mapStateToProps = (state: AppStateType) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch) =>{
    return {
        sendMessage:(newMessageBody: string)=>{
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}
export default compose<ComponentType>(
    connect(mapStateToProps,  mapDispatchToProps),
    withAuthRedirect)
    (Dialogs);