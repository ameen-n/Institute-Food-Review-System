import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function UserSign(){
    return (
        <>
            <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                <ul id="nav" className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink
                            exact to="/">Home</NavLink></li>
                    <li className="nav-item">
                        <NavLink exact to="/mess">Mess Menu</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/review">Feedback / Review
                        </NavLink></li>
                </ul>
            </div>

            <div className="button">
                <NavLink
                    exact
                    activeClassName="menu_active"
                    className="nav-link"
                    to="/logout"
                >
                    Logout
                </NavLink>
            </div>
        </>
    )
}