import Navbar from "../Navbar"
import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import Blogcard from "./blogcard";

export default function Blog() {
    const [checkadmin, setCheckadmin] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.jwttoken && cookies.ADMIN === "true") {
            setCheckadmin(true);
        } 
    }, [])

    const [redirect, setRedirect] = useState(false);
    const [blogdata, setMenudata] = useState([]);
    //const {state,dispatch} = useContext()

    useEffect(() => {

        fetch(process.env.REACT_APP_BACKEND + "/blog/blog", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(blogdata => {
                // console.log(blogdata)
                setMenudata(blogdata)
            })
            .catch(err => console.log("Something went wrong."))


    }, [])

    return (
        <>

            <Navbar />


            {redirect && <Redirect to="/" />}
            <div >
                <>
                    <section className="mainsectionreview">
                    <div className="center">
                    {!checkadmin &&
                        <>
                            <div className="limiter"  >
                                <NavLink className="btn btn-secondary  mr-4" to={"/myblogs"}>My Blogs</NavLink>
                                <NavLink className="btn btn-secondary  ml-4" to={"/newblogs"}>New Blog</NavLink>
                            </div>

                        </>
                    }

                </div>
                        <div class="page-wrapper p-t-180 p-b-100">
                            <div class="wrapper wrapper--w960">
                                <div class="card card-2">
                                    <div class="px-4 py-1 my-4 text-center">

                                        {blogdata !== undefined && blogdata !== null && blogdata && blogdata.map((val, index) => {
                                            return (

                                                <div key={val.id} class="row">
                                                    <div class="col-sm">
                                                        <hr />
                                                        <div class="review-block">
                                                            <div class="row">

                                                                <Blogcard key={val.id} value={val} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            </div>

        </>
    )
}