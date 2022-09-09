import React from 'react';
import s from './Header.module.css' ;
import { NavLink } from 'react-router-dom';
import {HeaderPropsType} from "./HeaderContainer";

const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
    <img src='http://a.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fncaa%2F500%2F41.png' />
  
    <div className={s.loginBlock}>
      { props.isAuth ? props.login :
      <NavLink to={'/login'}>Login</NavLink>}
      
    </div>
  </header>
}

export default Header;