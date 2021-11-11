import React from 'react'
import { useEffect,useState } from 'react';
import { useCookies } from "react-cookie";

export default function Blogcard(props) {
    // console.log(props)
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
            fetch(process.env.REACT_APP_BACKEND + "/blog/blog/" + id, {
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
                <img src={props.value.userID.image} class="img-rounded" allt = " " />
                <div class="review-block-name"><p>{props.value.userID.Name}</p></div>
                <div class="review-block-date">{props.value.createdAt.substring(0, 10)}<br />{props.value.createdAt.substring(11, 19)}</div>
                {checkadmin &&
                <div className="row center">
                    {/* <div className="col-2"> */}
                        <button className="btn btn-secondary  mr-1" onClick={() => onDelete(props.value._id)}>Delete</button>
                    {/* </div> */}
                </div>
            }
            </div>
            <div class="col-sm-9">
                <figure class="mb-4" alt =" "><img className="review-image" src={props.value.image} alt=" " width="400px" height="400px"/></figure>
                <div class="review-block-description"><p class="fs-5 mb-1">{props.value.text}</p></div>
            </div>

        </>
    )
}