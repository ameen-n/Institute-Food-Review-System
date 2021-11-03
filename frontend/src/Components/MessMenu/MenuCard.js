import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


export default function MenuCard(props) {

    const [checkadmin, setCheckadmin] = useState(true);

    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (token && userInfo && userInfo.isAdmin) {

        } else {
            setCheckadmin(false);
        }
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            fetch(process.env.REACT_APP_BACKEND + "/menu/menu/" + id, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log("succesfully deleted")
                window.location.reload();
            }).catch(err => console.log(err))
        }
    }
    return (
        <>
            <div className="table100-body">
                <table>
                    <tbody>
                        <tr className="row100 body">
                            <td className="cell100 column1">{props.value.fooditem}</td>
                            <td className="cell100 column2">{props.value.timing}</td>
                            <td className="cell100 column3">{props.value.day}</td>
                            {checkadmin &&
                                <>
                                    <td className="cell100 column4">
                                        <NavLink className="btn btn-sm btn-success" to={"/menutable/update/" + props.value._id}>
                                            Update
                                        </NavLink>
                                    </td>
                                    <td className="cell100 column5">
                                        <button type="submit" className="btn btn-sm btn-danger" onClick={() => onDelete(props.value._id)} >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            }


                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}