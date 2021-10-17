import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Redirect } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const ItemsTime = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
export default function UpdateMenu() {
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        fooditem: "",
        timing: "",
        day: ""
    })
    const [redirect , setRedirect] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        if (token) {

        } else {
            setRedirect(true);
        }

        fetch(process.env.REACT_APP_BACKEND + "/menu/menu/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(fetchedata => {
                // console.log(fetchedata)
                setData({
                    ...data,
                    fooditem: fetchedata[0].fooditem,
                    timing: fetchedata[0].timing,
                    day: fetchedata[0].day
                })
            })
            .catch(err => console.log(err));
    }, [id])

    const InputData = (e) => {
        const {name , value} = e.target;
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        console.log(data);
        fetch(process.env.REACT_APP_BACKEND + "/form/form/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(res => {
            toast.success('Successfully updated', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                history.push("/menutable");
            }, 2000);
        })
        .catch(err => console.log(err))

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
                                <h2 class="title">Update Form</h2>
                                <form onSubmit={SubmitHandle}>
                                    <div className="form-group">
                                        <label className="form-control-label text-muted">foodItem</label>
                                        <input type="text"
                                            placeholder="FoodItem"
                                            name="fooditem"
                                            value={data.fooditem}
                                            onChange={InputData} />
                                    </div>
                                    {weekdays.map((val , index) => {
                                        return (
                                            <div key={index} className="form-check form-check-inline">
                                                <input
                                                    className="radio-simple"
                                                    type="radio"
                                                    name="day"
                                                    onChange={InputData}
                                                    value={val} />
                                                <label class="form-check-label" for="exampleRadios1">
                                                    {val}
                                                </label>
                                            </div>
                                        )
                                    })}
                                    <br></br>
                                    {ItemsTime.map((val , index) => {
                                        return (
                                            <div key={index} className="form-check form-check-inline">
                                                <input
                                                    className="radio-simple"
                                                    type="radio"
                                                    name="timing"
                                                    onChange={InputData}
                                                    value={val} />
                                                <label class="form-check-label" for="exampleRadios1">
                                                    {val}
                                                </label>
                                            </div>
                                        )
                                    })}
                                    
                                    <button type="submit" className="btn-block btn-color">
                                        Submit
                                    </button>
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