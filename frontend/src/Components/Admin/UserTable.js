import Navbar from "../Navbar";
import { useEffect , useState } from "react";
import UserCard from "./UserCard";
import { Redirect } from "react-router";
import { useCookies } from "react-cookie";

export default function MenuTable(){

    const [redirect, setRedirect] = useState(false);
    const [menudata, setMenudata] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.jwttoken  && cookies.ADMIN === "true") {

        } else {
            setRedirect(true);
        }
        if(cookies.jwttoken  && cookies.ADMIN === "true"){
            fetch(process.env.REACT_APP_BACKEND + "/admin/users", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setMenudata(data)
                })
                .catch(err => console.log("something wrong"))
        }
        

    }, [])
    return (
        <>
            <Navbar />
            {redirect && <Redirect to="/" />}
            <section className="mainsection">
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver1 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="cell100 column1">Email</th>
                                                <th className="cell100 column2">Name</th>
                                                <th className="cell100 column3">isAdmin</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            {console.log(menudata)}
                            {menudata !== undefined && menudata !== null && menudata && menudata.map((val , index) => {
                                return (
                                <UserCard key={val.id} value={val} />
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