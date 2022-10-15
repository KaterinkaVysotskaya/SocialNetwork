import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import {BrowserRouter, Navigate, Route, Routes, useParams} from 'react-router-dom';
import {StoreType} from "./redux/store";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/login/Login';
import HeaderContainer from "./components/Header/HeaderContainer";
import CustomizedSnackbars from "./outils/ErrorSnackBar";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";

// export type StorePropsType = {
//     store: StoreType
// }

function App() {
    const dispatch = useDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <BrowserRouter>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <div className='app-wrapper'>
                <Navbar/>
                <HeaderContainer/>
                <CustomizedSnackbars/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/' element={<ProfileContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/dialogs' element={<DialogsContainer/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path="/profile/:userId" element={<WithRouterWrap/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path="*" element={<Navigate to='/404'/>}/>

                        {/* <Route path ='/News' element={<News/>} />
          <Route path ='/Music' element={<Music/>} />
          <Route path ='/Settings' element={<Settings/>} /> */}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;


const WithRouterWrap = () => {
    let {userId} = useParams();
    return <ProfileContainer userId={userId}/>
}

