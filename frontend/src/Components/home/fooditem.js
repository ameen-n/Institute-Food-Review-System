import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { defaultformAction } from "../../store/defaultformstore";
import { fooditemAction } from "../../store/fooditemStore";
import Navbar from "../Navbar";

export default function Form() {
    // all states
    const [data, setData] = useState({
        isLike: "",
        Comment: "",
    });
    const [redirect, setRedirect] = useState(false);
    const [rate, setRate] = useState(0);

    // variables gobals
    const dispatch = useDispatch();
    let userData = "";
    let history = useHistory();

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND + "/menu/menuitem", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                dispatch(fooditemAction.itemCheck(res))
            })
            .catch(err => console.log(err))
        let token = sessionStorage.getItem("Token");
        if (token) {
            userData = JSON.parse(sessionStorage.getItem('userInfo'));
            userData = userData._id;
        } else {
            setRedirect(true);
        }

    }, [])


    //change Handlers
    const eventInput = (event) => {
        const { name, value } = event.target;
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const ratingChanged = (newRating) => {
        setRate(newRating);
    };


    //submit handler
    const SubmitHandler = (e) => {
        e.preventDefault();
        let result = window.confirm("Will you Continue to fill the form....");

        if (!result) {
            if (rate === 0 || data.isLike === "") {
                toast.warning('Please Filled The Form Completely', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                let defaultData = {
                    DidLike: data.isLike === "Yes" ? true : false,
                    Rating: rate,
                    Comment: data.Comment,
                    UserId: JSON.parse(sessionStorage.getItem('userInfo'))._id,
                    RatingFoods: {},
                    LikeFoods: []
                }
                fetch(process.env.REACT_APP_BACKEND + "/form/form/", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(defaultData)
                }).then(res => res.json())
                    .then(fetchdata => {
                        toast.success('Successfully saved', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        setData({
                            isLike: "",
                            comment: "",
                        })
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch(err => console.log(err))
            }
        } else {
            if (rate === 0 || data.isLike === "") {
                return toast.warning('Please Filled The Form Completely', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                dispatch(defaultformAction.commentCheck(data.Comment));
                dispatch(defaultformAction.likeCheck(data.isLike));
                dispatch(defaultformAction.ratingCheck(rate));
                history.push("/review2");
            }

        }


    }




    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/" />}
            
            <section className="mainsectionreview"> 
                <div class="page-wrapper p-t-180 p-b-100">
                    <div class="wrapper wrapper--w960">
                        <div class="card card-2">
                            <div class="px-4 py-1 my-4 text-center">
                                <h1 class="display-5 fw-bold">Food Item Name</h1>
                                <br/>
                                <img class="rounded mx-auto d-block d-block mx-auto mb-4" src="https://recipesofhome.com/wp-content/uploads/2020/06/veg-biryani-recipe-720x540.jpg" alt="" height="200"/>
                                <div class="col-sm-5 m-auto">
                                    <div class="rating-block">
                                        <h4>Average user rating</h4>
                                        <h2 class="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                                        <span class="rating rating-loading" aria-hidden="true"></span>
                                        
                                        <button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
                                        <span class="fa fa-star rating-color" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm">
                                        <hr/>
                                        <div class="review-block">
					                        <div class="row">
                                                <div class="col-sm-3">
                                                    <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" class="img-rounded"/>
                                                    <div class="review-block-name"><a href="#">nktailor</a></div>
                                                    <div class="review-block-date">January 29, 2016<br/>1 day ago</div>
                                                </div>
                                                <div class="col-sm-9">
                                                    <div class="review-block-rate">
                                                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                    </div>
                                                    <div class="review-block-title">this was nice in buy</div>
                                                    <div class="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="review-block">
					                        <div class="row">
                                                <div class="col-sm-3">
                                                    <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" class="img-rounded"/>
                                                    <div class="review-block-name"><a href="#">nktailor</a></div>
                                                    <div class="review-block-date">January 29, 2016<br/>1 day ago</div>
                                                </div>
                                                <div class="col-sm-9">
                                                    <div class="review-block-rate">
                                                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </button>
                                                    </div>
                                                    <div class="review-block-title">this was nice in buy</div>
                                                    <div class="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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