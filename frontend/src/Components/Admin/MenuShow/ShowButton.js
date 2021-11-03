import { NavLink } from "react-router-dom";


export default function ShowButton(props){
    let href = "/menutable/";

    if(props.value !== undefined){
        href += props.value;
    }

    return (
        <>
            <NavLink to={href}  className="btn btn-info btn-md ml-3 mr-1 mb-2" >
                {props.value}
            </NavLink>
        </>
    )
}