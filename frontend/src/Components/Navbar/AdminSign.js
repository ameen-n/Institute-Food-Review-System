import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { NavLink } from "react-router-dom";
const day ="Sunday" ;
const DayinInt  = {
    0 : "Sunday",
    1  : "Monday",
    2 : "Tuesday",
    3  : "Wednesday",
    4  : "Thursday",
    5  : "Friday",
    6  :  "Saturday"
};
var currentTime = new Date();
var currentOffset = currentTime.getTimezoneOffset();
var ISTOffset = 330;   // IST offset UTC +5:30 
var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
let weekDay = DayinInt[ISTTime.getDay()];
export default function AdminSign() {
    return (
        <>
            <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                <ul id="nav" className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink 
                            exact to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            exact to="/static">Statistics</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/blogs">Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/Announcement">Announcements</NavLink>
                    </li>

                    {/* <li className="nav-item">
                        <NavLink exact to="/view"> View
                        </NavLink></li> */}
                    <li class="nav-item">
                    <NavLink exact to="/usertable">Tables</NavLink>
                        <ul class="sub-menu">
                            <li><NavLink exact to="/usertable">Users</NavLink></li>
                            <li><NavLink exact to="/menutable">Mess Menu</NavLink></li>
                            <li><NavLink exact to="/formtable">Form Table</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="button">
                <NavLink
                    exact
                    activeClassName="menu_active"
                    className="btn btn-danger"
                    to="/logout"
                >
                    Logout
                </NavLink>
            </div>
        </>
    )
}