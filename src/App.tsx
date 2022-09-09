import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { StoreType } from "./redux/store";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/login/Login';
import HeaderContainer from "./components/Header/HeaderContainer";

 export type StorePropsType = {
    store: StoreType
}
const App = () => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar /> 
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/users' element={<UsersContainer />} />
                        <Route path='/dialogs' element={<DialogsContainer  />} />
                        <Route path='/profile' element={<ProfileContainer /> } />
                        <Route path="/profile/:userId" element={<WithRouterWrap/>} />
                        <Route path="/login" element={<Login/>} />

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
    let { userId } = useParams(); 
    return <ProfileContainer userId={userId}/> 
}

