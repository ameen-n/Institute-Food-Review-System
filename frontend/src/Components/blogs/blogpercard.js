import React from 'react'
import { NavLink } from "react-router-dom";
export default function Blogcard(props) {

    console.log(props)
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            fetch(process.env.REACT_APP_BACKEND + "/blog/blog/" + id, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log("succesfully deleted")
                window.location.reload();
            }).catch(err => console.log(err))
        }
    }
    return (
        <>
            <div class="col-sm-3">
                <img src={props.value.userID.image} class="img-rounded" />
                <div class="review-block-name"><p>{props.value.userID.Name}</p></div>
                <div class="review-block-date">{props.value.createdAt.substring(0, 10)}<br />{props.value.createdAt.substring(11, 19)}</div>
            </div>
            <div class="col-sm-9">
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-secondary  mr-4" onClick={() => onDelete(props.value._id)}>Deleted</button>
                    </div>
                    <div className="col-1">
                        <NavLink className="btn btn-secondary  ml-4" to={"/updateblog/" + props.value._id}>Update</NavLink>
                    </div>
                </div>
                <br />

                <img className="review-image" src={props.value.image} classname="img-thumbnail" width="300px" height="300px" alt=" " />
                <div class="review-block-description">{props.value.text}</div>
            </div>
        </>
    )
}