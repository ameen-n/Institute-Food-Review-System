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

    useEffect(() => {
        if (cookies.jwttoken) {

        } else {
            setRedirect(true);
        }

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
                setData(fetchedata)
            })
            .catch(err => console.log(err));
    }, [fooditem])

    return (
        <>
            {/* <Navbar /> */}
            {data !== undefined && data.length !== 0 && data.map((val, index) => {
                return (
                    <>
                        <h4>Review by {val.UserId.Name}</h4>
                        <img src={val.UserId.image} />
                        <div class="rating">
                            <ReactStars
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
                        <p>{val.Comment}</p>

                    </>
                )
            })}
        </>
    )
}