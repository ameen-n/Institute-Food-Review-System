import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/logo/logo.png'
import { useCookies } from 'react-cookie';

import React from "react";
import { NavLink } from "react-router-dom";

import AdminSign from "./Navbar/AdminSign";
import UserSign from "./Navbar/UserSign";
import Normal from "./Navbar/Normal";

export default function Navbar() {
    
    const [cookies, setCookie] = useCookies(['user']);  

    const ChangeNav = () => {
        if (cookies.jwttoken && cookies.jwttoken !== undefined) {
            if (cookies.ADMIN !== null && cookies.ADMIN === "true") {
                return (
                    <AdminSign />
                )
            }
            else {
                return (
                    <UserSign />
                )
            }
        }
        else {
            return (
                <Normal />
            )
        }
    }

    return (
        <>
            <header className="header">
                <div className="navbar-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <nav className="navbar navbar-expand-lg">
                                    <NavLink exact className="navbar-brand logo" to="/">
                                        <img className="logo1" src={logo} alt="Logo" width="120" />
                                    </NavLink>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="toggler-icon"></span>
                                        <span className="toggler-icon"></span>
                                        <span className="toggler-icon"></span>
                                    </button>

                                    <ChangeNav />
                                </nav>

                            </div>
                        </div>

                    </div>

                </div>
            </header>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}