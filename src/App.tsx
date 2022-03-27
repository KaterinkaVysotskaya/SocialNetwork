import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/dialogs/Dialogs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreType } from "./redux/state";

type StorePropsType = {
    store: StoreType
}

const App = (props: StorePropsType) => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/Dialogs' element={<Dialogs dialogs={props.store._state.dialogsPage.dialogs}
                            messages={props.store._state.dialogsPage.messages} />} />
                        // <Route path='/Profile'
                            element={<Profile
                                newPostText={props.store._state.profilePage.newPostText}
                                posts={props.store._state.profilePage.posts}
                                addPost={props.store.addPost.bind(props.store)}
                                updateNewPostText={props.store.updateNewPostText.bind(props.store)} />
                            } />

                        {/* <Route path ='/News' element={<News/>} />
          <Route path ='/Music' element={<Music/>} />
          <Route path ='/Settings' element={<Settings/>} /> */}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>);
}
export default App;


