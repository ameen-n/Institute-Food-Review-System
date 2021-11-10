import Navbar from "../Navbar"
import React,{useState,useEffect,useContext} from 'react'
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import Blogpercard from "./blogpercard";
import { useCookies } from "react-cookie";

export default function BlogPer() {

    const [redirect, setRedirect] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);
    const [checkadmin, setCheckadmin] = useState(false);
    const [blogdata, setMenudata] = useState([]);
    //const {state,dispatch} = useContext()
    const lid = cookies.ID;
    useEffect(() => {
        if (cookies.jwttoken) {

        } else {
            // setCheckadmin(false);
            setRedirect(true)
        }
        if(!(cookies.jwttoken && cookies.ADMIN === "true"))
            setCheckadmin(false);

        fetch(process.env.REACT_APP_BACKEND + "/blog/blog/blog/" + lid , {
            //console.log(lid)
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
            .catch(err => console.log("something wrong"))


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
                            <NavLink className="btn btn-secondary float-right" to={"/newblogs"}>
                                         New Blog
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

                                                            <Blogpercard key={val.id} value={val} />
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