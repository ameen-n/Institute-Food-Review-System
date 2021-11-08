import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import ReactStars from "react-rating-stars-component";

export default function RatingPerFood() {
    const history = useHistory();
    const { fooditem } = useParams();
    const [data, setData] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);
    const [average, setAverage] = useState(0);
    const [picture , setPicture] = useState("https://res.cloudinary.com/dynuzthsk/image/upload/v1636130414/WhatsApp_Image_2021-11-05_at_22.05.37_jqjv9i.jpg")

    useEffect(() => {
        if (cookies.jwttoken) {

        } else {
            setRedirect(true);
        }

        fetch(process.env.REACT_APP_BACKEND + "/menu/menu/item/" + fooditem, {
            method : "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(fetchedata => {
            setPicture(fetchedata.image)
            console.log(fetchedata)

        }).catch(err => console.log(err))
        fetch(process.env.REACT_APP_BACKEND + "/form/rating/" + fooditem, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(fetchedata => {
                console.log(fetchedata)
                let total = 0;
                fetchedata.forEach(element => {
                    // console.log(element)
                    total += parseInt(element.Rating);
                });
                // console.log(total)
                if (fetchedata.length > 0)
                    setAverage(total / fetchedata.length)
                setData(fetchedata)
            })
            .catch(err => console.log(err));
    }, [fooditem])

    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/" />}
            <section className="mainsectionreview">
                <div class="page-wrapper p-t-180 p-b-100">
                    <div class="wrapper wrapper--w960">
                        <div class="card card-2">
                            <div class="px-4 py-1 my-4 text-center">
                                <h1 class="display-5 fw-bold">{fooditem}</h1>
                                <br />
                                <img class="rounded mx-auto d-block d-block mx-auto mb-4" src={picture} alt="" height="200" />
                                <div class="col-sm-5 m-auto">
                                    <div class="rating-block">
                                        <h4>Average user rating</h4>
                                        <h2 class="bold">{average} <small> / 5 </small></h2>
                                        <span class="rating rating-loading" aria-hidden="true"></span>
                                        <div className="m-auto"> 
                                            <ReactStars
                                                class="btn btn-warning btn-sm"
                                                classNames = "m-auto"
                                                value={average}
                                                size={28}
                                                isHalf={true}
                                                edit={false}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {data !== undefined && data.length !== 0 && data.map((val, index) => {
                                    return (
                                        <>
                                            <div class="row">
                                                <div class="col-sm">
                                                    <hr />
                                                    <div class="review-block">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <img src={val.UserId.image} class="img-rounded" />
                                                                <div class="review-block-name"><p>{val.UserId.Name}</p></div>
                                                                <div class="review-block-date">{val.createdAt.substring(0, 10)}<br />{val.createdAt.substring(11, 19)}</div>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <div class="review-block-rate">
                                                                    <ReactStars
                                                                        class="btn btn-warning btn-sm"
                                                                        aria-label="Left Align"
                                                                        value={val.Rating}
                                                                        size={24}
                                                                        isHalf={true}
                                                                        edit={false}
                                                                        emptyIcon={<i className="far fa-star"></i>}
                                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                        fullIcon={<i className="fa fa-star"></i>}
                                                                        activeColor="#ffd700"
                                                                    />
                                                                </div>
                                                                <div class="review-block-description">{val.Comment}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />

                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}