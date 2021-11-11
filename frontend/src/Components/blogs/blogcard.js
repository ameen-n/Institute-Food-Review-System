import React from 'react'

export default function Blogcard(props) {
    // console.log(props)

    return (
        <>
            <div class="col-sm-3">
                <img src={props.value.userID.image} class="img-rounded" allt = " " />
                <div class="review-block-name"><p>{props.value.userID.Name}</p></div>
                <div class="review-block-date">{props.value.createdAt.substring(0, 10)}<br />{props.value.createdAt.substring(11, 19)}</div>
            </div>
            <div class="col-sm-9">
                
                <figure class="mb-4" alt =" "><img className="review-image" src={props.value.image} alt=" " width="400px" height="400px"/></figure>
                <div class="review-block-description"><p class="fs-5 mb-1">{props.value.text}</p></div>
            </div>

        </>
    )
}