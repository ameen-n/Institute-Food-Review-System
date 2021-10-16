
//import Navbar from "../Navbar";
import { useEffect , useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
//import { Link } from "react-router-dom";
//import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

  
export default function MenuCard(props) {
  let history = useHistory();
    
  const [redirect, setRedirect] = useState(false);
  const [menudata, setMenudata] = useState([]);
  const onDelete = id => {
    
    if (window.confirm('Are you sure to delete this record?')){
    fetch(process.env.REACT_APP_BACKEND + "/menu/menu/" + id, {
      method: "DELETE",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      }
    }).then((res) =>{
      // console.log(res);
      console.log("succesfully deleted")
      window.location.reload();
    }).catch(err => console.log(err))
  } 
}
// const onUpdate = id => {
//   //<Redirect to="/Home" />
//  // <Link className="nav-link" to="/update"></Link>)
//  history.push('/update')
//  //var x = props.value.updatefooditem;
//  //console.log(props.value.updatefooditem)

//  //document.write(props.value.updatefooditem);
//   let menudata = {
//       fooditem:props.value.fooditem,
//       timing: props.value.updatetime,
//       day: props.value.updateday, 
//   }
//   fetch(process.env.REACT_APP_BACKEND + "/menu/menu/" + id, {
//     method: "PUT",
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//   },
//   body : JSON.stringify(menudata)
// }).then(res => res.json())
// .then(data => {

//     setMenudata(menudata)
//      // window.location.reload();
// })
// .catch(err => console.log("something wrong"))
  





    return (
      <> 
        <div className="table100-body">
          <table>
            <tbody>
              <tr className="row100 body">
                <td className="cell100 column1">{props.value.fooditem}</td>
                <td className="cell100 column2">{props.value.timing}</td>
                <td className="cell100 column3">{props.value.day}</td>
                <td className="cell100 column4">

                  <NavLink className="btn btn-sm btn-success" to={"/menutable/update/" + props.value._id}>
                      Update
                  </NavLink>
                  <button type="submit" className="btn btn-sm btn-danger" onClick={() => onDelete(props.value._id)} >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
  
