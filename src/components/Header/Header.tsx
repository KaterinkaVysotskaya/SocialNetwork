import React from 'react';
import s from './Header.module.css' ;
import { NavLink } from 'react-router-dom';
import {HeaderPropsType} from "./HeaderContainer";
import Button from "@mui/material/Button";
import {Avatar, Col, Layout, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import 'antd/dist/reset.css';
import {useAppSelector} from "../../redux/redux-store";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/auth-reducer";


const Header = React.memo((props) => {
   const isAuth = useAppSelector(state=>state.auth.isAuth)
    const login = useAppSelector(state=>state.auth.login)
    const dispatch = useDispatch()
    const logoutCallback = ()=>{
       dispatch(logout())
    }
    const { Header} = Layout;
    return <Header >
        <Row>
            <Col span={20}>

            </Col>
            <Col>

                <div className={s.loginBlock}>
                    {isAuth
                        ? <div>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            {login}  -  <Button onClick={logoutCallback}>Log out</Button> </div>
                        : <NavLink to={'/login'}><Button>Login</Button></NavLink>}

                </div>
            </Col>
        </Row>


  </Header>
})

export default Header;