import React from 'react'

export default function Blogcard(props) {
    // console.log(props)

    return (
        <>
            <div class="col-sm-3">
                <img src={props.value.userID.image} class="img-rounded" />
                <div class="review-block-name"><p>{props.value.userID.Name}</p></div>
                <div class="review-block-date">{props.value.createdAt.substring(0, 10)}<br />{props.value.createdAt.substring(11, 19)}</div>
            </div>
            <div class="col-sm-9">
                <img className="review-image" src={props.value.image} classname="img-thumbnail"  width="300px" height="300px" alt="Cinque Terre" />
                <div class="review-block-description">{props.value.text}</div>
            </div>

        </>
    )
}