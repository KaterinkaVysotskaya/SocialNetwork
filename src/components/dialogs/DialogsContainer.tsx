import React, { ComponentType } from 'react'
import { dialogsActions } from "../../redux/dialogs-reducer";
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { compose} from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

let mapStateToProps = (state: AppStateType) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps,  {sendMessage: dialogsActions.sendMessageAC}),
    withAuthRedirect)
    (Dialogs);