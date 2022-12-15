import React, {Suspense, lazy, useEffect, useState} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Link, Navigate, NavLink, Route, Routes} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import CustomizedSnackbars from "./outils/ErrorSnackBar";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {WithRouterWrap} from "./outils/withRouterWrap";
import {UsersPage} from "./components/Users/UsersContainer";
import 'antd/dist/reset.css';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Avatar, Breadcrumb, Col, Layout, Menu, Row, theme} from 'antd';
import s from "./components/Navbar/Navbar.module.css";
import Header from "./components/Header/Header";



const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/login/Login'));
const DialogsContainer = lazy(() => import("./components/dialogs/DialogsContainer"))
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"))

const { Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const profile = <NavLink  to='/profile' className = { navData => navData.isActive ? s.active : s.item }>Profile</NavLink>
const items: MenuItem[] = [
    getItem('My profile', 'sub1', <UserOutlined />, [
        getItem('profile','3',    ),
        getItem('messages', '4'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('users', '6'), ]),
    getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header  />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>

                            {status === 'loading' && <LinearProgress color="secondary"/>}
                            <div className='app-wrapper'>
                                <Navbar/>
                                {/*<HeaderContainer/>*/}
                                <CustomizedSnackbars/>
                                <div className='app-wrapper-content'>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Routes>
                                            <Route path='/' element={<ProfileContainer/>}/>
                                            <Route path='/users' element={<UsersPage/>}/>
                                            <Route path='/dialogs' element={<DialogsContainer/>}/>
                                            <Route path='/profile' element={<ProfileContainer/>}/>
                                            <Route path="/profile/:userId" element={<WithRouterWrap/>}/>
                                            <Route path="/login" element={<Login/>}/>
                                            <Route path="/chat" element={<ChatPage/>}/>
                                            <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                                            <Route path="*" element={<Navigate to='/404'/>}/>

                                            {/* <Route path ='/News' element={<News/>} />
                             <Route path ='/Music' element={<Music/>} />
                             <Route path ='/Settings' element={<Settings/>} /> */}
                                        </Routes>
                                    </Suspense>
                                </div>
                            </div>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2022 Created by Catherine Vyssotskaya</Footer>
            </Layout>
        </Layout>
        </BrowserRouter>
    );
};



export default App;



