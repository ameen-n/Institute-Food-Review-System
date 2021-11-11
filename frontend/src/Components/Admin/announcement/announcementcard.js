import Navbar from "../../Navbar";
import React,{useState,useEffect,useContext} from 'react'
import { Redirect } from "react-router";
//import MenuCard from "../MessMenu/MenuCard";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import Image from "../../../assets/images/Admin_image.png"

export default function Announcementcard(props) {

    const [checkadmin, setCheckadmin] = useState(true);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.jwttoken  && cookies.ADMIN === "true") {

        } else {
            setCheckadmin(false);
        }
    }, [])
    
    const onDelete = id => {
        if (window.confirm('Are you sure you want to delete this record? This cannot be reversed.')) {
            fetch(process.env.REACT_APP_BACKEND + "/announcement/announcement/" + id, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log("Succesfully Deleted!")
                window.location.reload();
            }).catch(err => console.log(err))
        }
    }
    
    return (
        <>
            <div class="col-sm-3">
                <img src={checkadmin ? props.value.userID.image : Image} class="img-rounded" width="150px" height="150px" />
                <div class="review-block-name"><p>{checkadmin  ? props.value.userID.Name : "ADMIN"}</p></div>
                <div class="review-block-date">{props.value.createdAt.substring(0, 10)}<br />{props.value.createdAt.substring(11, 19)}</div>
            </div>
            <div class="col-sm-9">
            {checkadmin &&
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-secondary  mr-1" onClick={() => onDelete(props.value._id)}>Deleted</button>
                    </div>
                    <div className="col-1">
                        <NavLink className="btn btn-secondary  ml-1" to={"/UpdateAnnouncement/" + props.value._id}>Update</NavLink>
                    </div>
                </div>
            }
            <br />
                <img className="review-image" src={props.value.image} classname="img-thumbnail" width="300px" height="300px" alt=" " />
                <div class="review-block-description"><p class="fs-5 mb-1">{props.value.text}</p></div>
            </div>
           

        </>
    )
}