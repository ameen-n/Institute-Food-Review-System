import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function AdminSign() {
    return (
        <>
            <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                <ul id="nav" className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink 
                            exact to="/">Home</NavLink></li>

                    {/* <li className="nav-item">
                        <NavLink exact to="/view"> View
                        </NavLink></li> */}
                    <li class="nav-item">
                    <NavLink exact to="/usertable">Tables</NavLink>
                        <ul class="sub-menu">
                            <li><NavLink exact to="/usertable">Users</NavLink></li>
                            <li><NavLink exact to="/menutable">Mess Menu</NavLink></li>
                        </ul>
                    </li>
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