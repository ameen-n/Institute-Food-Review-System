import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';


export default function Review2() {
    const history = useHistory();
    const itemdata = useSelector(state => state.foodItem.data);
    const formlike = useSelector(state => state.defForm.like)
    const formrating = useSelector(state => state.defForm.rating)
    const formComment = useSelector(state => state.defForm.Comment)
    const [cookies, setCookie] = useCookies(['user']);  

    if (itemdata.length === 0) {
        window.location = "/review";
    }
    const [checkedState, setCheckedState] = useState(
        new Array(itemdata.length).fill(false)
    );
    const [checkRating, setCheckRating] = useState(
        new Array(itemdata.length).fill(0)
    )
    const [checkComment, setCheckComment] = useState(
        new Array(itemdata.length).fill("")
    )




    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const SumitHandler = (e) => {
        e.preventDefault();
        console.log(checkComment);
        let ratingArr = {}, itemArr = [];
        console.log(checkRating)
        for (let i = 0; i < itemdata.length; i++) {
            if (checkRating[i] > 0) {
                // console.log(itemdata[i] , checkRating[i])
                ratingArr[itemdata[i]] = [checkRating[i],checkComment[i]];
            }
            if (checkedState[i] === true) {
                itemArr.push(itemdata[i])
            }
        }
        console.log(ratingArr);
        if (formlike === "" || formrating === 0) {
            toast.error('Some Error please try again', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                history.push("/review")
            }, 2000);
        }
        else {
            let defaultData = {
                DidLike: formlike === "Yes" ? true : false,
                Rating: formrating,
                Comment: formComment,
                UserId:  cookies.ID,
                RatingFoods: ratingArr,
                LikeFoods: itemArr
            }
            fetch(process.env.REACT_APP_BACKEND + "/form/form/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(defaultData)
            }).then(res => res.json())
                .then((res) => {
                    if (res.message === "Form save successfully") {
                        toast.success('Thanks for filling the form', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setTimeout(() => {
                            history.push("/review")
                        }, 2000);
                    }
                    else {
                        toast.error('Some Error please try again', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setTimeout(() => {
                            history.push("/review")
                        }, 2000);
                    }
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <>
            <Navbar />
            <form onSubmit={SumitHandler}>
                <ul className="toppings-list">
                    {itemdata !== undefined && itemdata !== null && itemdata.length !== 0 && itemdata.map((val, index) => {
                        return (
                            <li key={index}>
                                <div className="toppings-list-item">
                                    <div className="left-section">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={val}
                                            value={val}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />
                                        <label htmlFor={`custom-checkbox-${index}`}>{val}</label>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <ul className="toppings-list">
                    {itemdata !== null && itemdata !== undefined && itemdata.length !== 0 && itemdata.map((val, index) => {
                        return (
                            <ul>
                                <li key={index}>
                                    <h2>{val}</h2>
                                    <ReactStars
                                        count={5}
                                        onChange={(value) => {
                                            const updatedRate = checkRating.map((item, ind) =>
                                                index === ind ? value : item
                                            )
                                            setCheckRating(updatedRate)
                                        }}
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                </li>
                                <li>
                                    <div>
                                        <label for="fname" className="left-align2"><h4>Comments</h4></label><br />
                                        <textarea
                                            placeholder="Enter Comment"
                                            value={checkComment[index]}
                                            name={val}
                                            onChange={(event) =>{
                                                const { name, value } = event.target;
                                                const updatedCheckedState = checkComment.map((item , ind) =>
                                                        index === ind ? value : item
                                                    )
                                                    setCheckComment(updatedCheckedState)
                                            }}
                                            rows="4" cols="30" maxlength="100"
                                        >
                                        </textarea>
                                    </div>
                                </li>
                            </ul>
                        )
                    })}
                </ul>
                <button type="submit" className="btn btn-danger">
                    Submit
                </button>
            </form>
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