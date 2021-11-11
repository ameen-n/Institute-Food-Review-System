import Navbar from "../../Navbar";
import React,{useState,useEffect,useContext} from 'react'
import { Redirect } from "react-router";
//import MenuCard from "../MessMenu/MenuCard";
import { NavLink } from "react-router-dom";
import Announcementcard from "./announcementcard";
import { useCookies } from "react-cookie";

export default function Announcement() {

    const [redirect, setRedirect] = useState(false);
    const [blogdata, setMenudata] = useState([]);
    //const {state,dispatch} = useContext()
    const [cookies, setCookie] = useCookies(['user']);
    const [checkadmin, setCheckadmin] = useState(true);

    useEffect(() => {
        if (cookies.jwttoken  && cookies.ADMIN === "true") {

        } else {
            setCheckadmin(false);
        }
        if(cookies.jwttoken){} 
        else {setRedirect(true)}

        fetch(process.env.REACT_APP_BACKEND + "/announcement/announcement", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(blogdata => {
                console.log(blogdata)
                setMenudata(blogdata)
            })
            .catch(err => console.log("Something went wrong with your request!"))


    }, [])
    
    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/" />}
            <div >
                <>
                    <section className="mainsectionreview">
                    <div className="center">
                    {checkadmin &&
                        <>
                            <div className="limiter"  >
                            <NavLink className="btn btn-secondary float-right" to={"/newAnnouncement"}>
                                            New Announcement
                                        </NavLink>
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

                                                            <Announcementcard key={val.id} value={val} />
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