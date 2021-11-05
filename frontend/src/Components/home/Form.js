import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

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
    const [cookies, setCookie] = useCookies(['user']);  

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
        // let token = sessionStorage.getItem("Token");
        if (cookies.jwttoken && cookies.jwttoken !== undefined) {
            // userData = JSON.parse(sessionStorage.getItem('userInfo'));
            // userData = userData._id;
            userData = cookies.ID;
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
                            <div class="card-body">
                                <h2 class="title">Review Form</h2>
                                <form onSubmit={SubmitHandler} >
                                    <h4>Do you like the food?</h4>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="radio-simple"
                                            type="radio"
                                            name="isLike"
                                            onChange={eventInput}
                                            value="Yes" />
                                        <label class="form-check-label" for="exampleRadios1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="radio-simple"
                                            name="isLike"
                                            onChange={eventInput}
                                            value="no" />
                                        <label class="form-check-label" for="exampleRadios2">
                                            No
                                        </label>
                                    </div>
                                    
                                    <h4 className="form-heading">Please rate the food</h4>
                                    <div className="form-check form-check-inline">
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={24}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </div>

                                    <div>
                                        <label for="fname" className="left-align2"><h4>Comments</h4></label><br />
                                        <textarea
                                            placeholder="Enter Comment"
                                            value={data.Comment}
                                            onChange={eventInput}
                                            rows="4" cols="50" maxlength="200"
                                            name="Comment"
                                        >
                                        </textarea>
                                    </div>
                                    <br /><br />
                                    <div class="col-2">
                                        <div class="p-t-30">
                                            <button class="btn btn--radius btn--green" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
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