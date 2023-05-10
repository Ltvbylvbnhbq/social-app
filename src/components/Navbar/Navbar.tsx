import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {
    return (<nav className={s.nav}>
        <div className={s.item}>
            <NavLink to="/profile" className={navData=>navData.isActive? s.activeLink:s.item}>Profile</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to="/dialogs" className={navData=>navData.isActive? s.activeLink:s.item}>Message</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to="/users" className={navData=>navData.isActive? s.activeLink:s.item}>Users</NavLink>
        </div>
        <div className={s.item}>
            <a>News</a>
        </div>
        <div className={s.item}>
            <a>Music</a>
        </div>
        <div className={s.item}>
            <a>Settings</a>
        </div>
    </nav>)
        }

export default Navbar;