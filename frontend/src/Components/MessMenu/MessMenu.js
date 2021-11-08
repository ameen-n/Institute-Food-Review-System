import Navbar from "../Navbar"
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import MenuCard from "./MenuCard";
import ShowButton from "../Admin/MenuShow/ShowButton";
import { useCookies } from "react-cookie";

const day = ["Sunday" , "Monday", "Tuesday" , "Wednesday" , "Thursday" , "Friday", "Saturday"];

export default function MessMenu() {

    const [redirect, setRedirect] = useState(false);
    const [menudata, setMenudata] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.jwttoken) {

        } else {
            setRedirect(true);
        }

        fetch(process.env.REACT_APP_BACKEND + "/menu/menu", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setMenudata(data)
            })
            .catch(err => console.log("something wrong"))


    }, [])

    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/" />}
            <section className="mainsection">
                <div className="limiter">
                <div class="center"> 
                    {day.map((val , index)=>{
                        return (
                            <ShowButton key={index} value={val} />
                        )
                    })}
                </div>
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver1 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="cell100 column1">Food Item</th>
                                                <th className="cell100 column2">Timing</th>
                                                <th className="cell100 column3">Day</th>
                                                <th className="cell100 column4">View</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            {console.log(menudata)}
                            {menudata !== undefined && menudata !== null && menudata && menudata.map((val , index) => {
                                return (
                                <MenuCard key={val.id} value={val} />
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