import React, {Suspense, lazy, useEffect} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, HashRouter, Navigate, Route, Routes, useParams} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import CustomizedSnackbars from "./outils/ErrorSnackBar";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Login = React.lazy(() => import('./components/login/Login'));
const DialogsContainer = lazy(() => import("./components/dialogs/DialogsContainer"))

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
        <HashRouter >
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <div className='app-wrapper'>
                <Navbar/>
                <HeaderContainer/>
                <CustomizedSnackbars/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div>Loading...</div>}>
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
                    </Suspense>
                </div>
            </div>
        </HashRouter>
    );
}
export default App;

const WithRouterWrap = () => {
    let {userId} = useParams();
    return <ProfileContainer userId={userId}/>
}

