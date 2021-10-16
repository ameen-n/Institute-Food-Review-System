import React, {  useState } from "react";
import { NavLink } from "react-router-dom";

// import { NavLink } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar";
import { useParams,Redirect,useHistory } from 'react-router-dom';
//import{useparams,Redirect} from from "react-router-dom";
import GoogleLogin from 'react-google-login';

//const onUpdate(id) 
//const{id}= useParams();
const Update = () => {
  let token;
  const {id} = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    fooditem: "",
    Time: "",
    Day: "",
    // verifyTime: ""
  })
  // const [redirect, setRedirect] = useState(false);
  // useEffect(() => {
  //   if (sessionStorage.getItem('Token')) {
  //     setRedirect(true);
  //   }
  // }, [])
  const InputData = (event) => {
    const { name, value } = event.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    })
  }

  const responseGoogle = (response) =>{
    console.log(response)
  }
  const LoginSubmit = (e) => {
    e.preventDefault();
    const login = {
      fooditem: data.fooditem,
      Time: data.Time,
      Day: data.Day,
      // verifyTime: data.verifyTime,
    }


    fetch(process.env.REACT_APP_BACKEND + "/menu/menu/" + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      .then(res => res.json())
      .then(data => {

        token = data.jsonToken;
        // console.log(data)
        if (token !== undefined && token !== null) {
          // console.log(token);
          sessionStorage.setItem("Token", token);
          sessionStorage.setItem("userInfo", JSON.stringify(data.user));
            toast.success('🦄 Successful login !', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              // window.location.href = "/user";
              history.push("/user");
            }, 2000);
        }
        else {
          toast.info(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // alert(data.message)
        }
      })
      .catch(err => console.log(err));

  }

  return (
    <>
      <Navbar />
      <div>
<h1> updatation form succesful</h1>
<form className="form" onSubmit={LoginSubmit}>

<section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem;"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Update Menu</h2>
              <p className="text-white-50 mb-5"></p>

              
              <div class="mb-3">
  
  <input type="text" class="form-control" id="exampleFormControlInput1" name="fooditem"placeholder="Food Item" value={setData.username} onChange={InputData}/>
</div>
<div class="mb-3">
              <select class="form-select" aria-label="Default select example"name="Time" value={setData.Time} onChange={InputData}>
  <option selected>Time</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Lunch">Lunch</option>
  <option value="Snacks">Snacks</option>
  <option value="Dinner">Dinner</option>
</select>
</div>
<div class="mb-3">
<select class="form-select" aria-label="Default select example" name="Day" value={setData.Day} onChange={InputData}>
  <option selected>Day</option>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
  <option value="Sunday">Sunday</option>
</select>
</div>
             

              <button className="btn btn-outline-light btn-lg px-5" type="submit" >Update </button>

              
              
            </div>

            

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  
    
  </form>
  </div>
  </>
  );
};

export default Update();


