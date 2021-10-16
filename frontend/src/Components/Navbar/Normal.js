import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { NavLink } from "react-router-dom";

export default function Normal(){
    let Token;

    const responseSuccessGoogle = (response) => {
        // console.log(response)
        // let checkMail = response.it.Tt;

        // if (checkMail.slice(-12) === "@iitdh.ac.in") {
            fetch(`${process.env.REACT_APP_BACKEND}/api/googlelogin`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokenId: response.tokenId })
            }).then(data => data.json())
            .then(res => {
                    //   console.log(res)
                    if(res.message == "Other mail"){
                        toast.warning('Please Login with IITDh Email', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                    }else{

                        Token = res.jsonToken;
                        if (Token !== undefined && Token !== null) {
                            sessionStorage.setItem("Token", Token);
                            sessionStorage.setItem("userInfo", JSON.stringify(res.user));
                            toast.success('Successfully login', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            window.location.reload();
                        }
                        else {
                            toast.error('Something went Wrong', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                })
                .catch(err => console.log(err))

    }
    const responseErrorGoogle = (response) => {
        console.log("dsv")
        return console.log("fvf")
    }

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
                <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENTID}
                    buttonText="Login"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
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