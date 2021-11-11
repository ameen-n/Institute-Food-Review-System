import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import MenuCard from "../../MessMenu/MenuCard";
import { useParams , Redirect  } from "react-router";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PerdayFood(){
    const { id } = useParams();
    let history = useHistory();
    const [data , setData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.jwttoken) {

        } else {
            setRedirect(true);
        }


        fetch(process.env.REACT_APP_BACKEND + "/menu/menu/menu/" + id , {
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(fetchdata => {
            console.log(fetchdata)
            setData(fetchdata)
        })
        .catch(err => console.log(err))
    }, [id])
    return (
        <>
           <Navbar />
            {redirect && <Redirect to="/" />}
            <section className="mainsection">
                <div className="limiter">
                <div class="center">
                    <button class="btn btn-info btn-md ml-3 mr-1 mb-2" onClick={() => history.goBack()}>
                        Go Back
                    </button>
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
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                {data !== undefined && data !== null && data.length !== 0 && data.map((val , index) => {
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