import { useState , useEffect } from "react";
import { Redirect } from "react-router";
import Navbar from "../Navbar";

export default function Form(){

    const [data , setData] = useState({
        isLike : "",
        comment : "",
    });
    const [redirect , setRedirect] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        if(token){

        }else{
            setRedirect(true);
        }

    }, [])

    const eventInput = (event) =>{
        const {name , value} = event.target;
        setData((preValue) =>{
            return {
                ...preValue ,
                [name] : value
            }
        })
    }

    const SubmitHandler = (e) =>{
        e.preventDefault();
        alert(`your data is submitted with ${data.isLike}`);
        setData({
            isLike : "",
            comment : "",
        })
    }
    return (
        <>
         <Navbar  /> 
        {redirect && <Redirect to="/" />}
        <section className="mainsection">
        <form onSubmit={SubmitHandler} >
        <div className="formbox">
            <div >
                <label for="fname"><h4>Do You Like this food?</h4></label><br/>
                <input 
                type="radio" 
                name="isLike" 
                onChange={eventInput}
                value="Yes"/>
                Yes
                <input 
                type="radio" 
                name="isLike" 
                onChange={eventInput}
                value="no"/>No
                <br/><br/>
            </div>
            <label for="fname" className="left-align2"><h4>Comments</h4></label><br/>
            <textarea 
            placeholder="Enter Comment"
            value={data.comment}
            onChange={eventInput}
            rows="4" cols="50" maxlength="200"
            name="comment"
            >

            </textarea>
            <br/><br/>
            <button className="buttons" type="submit">Submit</button>
        </div>
    </form>
    </section>
        </>
    )
}