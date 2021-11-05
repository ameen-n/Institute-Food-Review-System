import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

import React from "react";
import { NavLink } from "react-router-dom";

export default function Normal(){
    let Token;
    const [cookies, setCookie] = useCookies(['user']);
    let history = useHistory();

    const responseSuccessGoogle = (response) => {
        console.log(response)
        // let checkMail = response.it.Tt;

        // if (checkMail.slice(-12) === "@iitdh.ac.in") {
            // fetch(`${process.env.REACT_APP_BACKEND}/api/googlelogin`, {
            //     method: "POST",
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         withCredentials : true,
            //         credentials : "include"
            //     },
            //     body: JSON.stringify({ tokenId: response.tokenId })
            // })
            axios({
                method : 'post' , 
                url  : `${process.env.REACT_APP_BACKEND}/api/googlelogin`,
                data : JSON.stringify({ tokenId: response.tokenId }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    withCredentials : true,
                    credentials : 'include'
                }
            })
            // .then(data => data.json())
            .then(res => {
                      console.log(res)
                    if(res.data.message === "Other mail"){
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

                        Token = res.data.jsonToken;
                        if (Token !== undefined && Token !== null) {
                            setCookie('jwttoken', Token, { path: '/' ,  expires : new Date(Date.now() + 48*360000) });
                            setCookie('ADMIN', res.data.user.isAdmin, { path: '/' ,  expires : new Date(Date.now() + 48*360000) });
                            setCookie('ID' , res.data.user._id , {path : '/' , expires : new Date(Date.now() + 48*360000)})
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
        console.log(response)
        return console.log("fvf")
    }

    const HandleReq = () => {
        toast.warning('Please Login', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                <ul id="nav" className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink
                            exact to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <button onClick={HandleReq}>Mess Menu</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={HandleReq}>Feedback / Review
                        </button></li>
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