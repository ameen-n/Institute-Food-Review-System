import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Navbar from "../Navbar";
import Navbar from "../../Navbar";
import { Redirect } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";


export default function UpdateAnnouncement() {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [image , setImage] = useState("");
    const { id } = useParams();
    // const l = JSON.parse(sessionStorage.getItem("userInfo"));
    const [data, setData] = useState({
        userID: cookies.ID,
        image: "",
        text: ""
    })
    const [redirect , setRedirect] = useState(false);

    useEffect(() => {
        if (cookies.jwttoken) {

        } else {
            setRedirect(true);
        }
        fetch(process.env.REACT_APP_BACKEND + "/announcement/announcement/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(fetchedata => {
                console.log(fetchedata)
                setData({
                    ...data,
                    text  : fetchedata[0].text
                })
                setImage(fetchedata[0].image)
            })
            .catch(err => console.log(err));
    }, [id])

    const uploadChange = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "ifmsImage");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dnvqpohyb/image/upload",
          {
            method: "POST",
            body: data
          }
        );
    
        const file = await res.json();
        console.log(file);
        setImage(file.secure_url);
      };

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
        let temp_data = {
            userID: cookies.ID,
            image: image,
            text: data.text
        }
        console.log(temp_data);
        fetch(process.env.REACT_APP_BACKEND + "/announcement/announcement/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp_data)
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
                history.push("/Announcement");
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
                                <h2 class="title">Update Annoucement</h2>
                                <form onSubmit={SubmitHandle}>
                                    <h4> 
                                        <label className="form-control-label"></label>
                                    </h4>
                                    
                                    <div className="btn #64b5f6 blue darken-1">
                                    <span>Uplaod Image</span>
                                    <input type="file" name="image"  onChange={uploadChange} />
                                    </div>
                                    <br/>
                                    <img src={image} alt="not imag" />
                                    <br></br>
                                    <div className="input-group">
                                        <input class="input--style-2" 
                                            type="text"
                                            placeholder="Enter text"
                                            name="text"
                                            value={data.text}
                                            onChange={InputData} />
                                    </div>
                                    <br/>
                                    <button class="btn btn-sm btn-success mt-4 " type="submit">
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