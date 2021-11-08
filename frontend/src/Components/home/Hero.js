import { useState , useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function Hero(){

    const [redirect, setRedirect] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if(cookies.jwttoken){
            if(cookies.ADMIN === "true"){
                setRedirect(true);
            }
        }else{
            setRedirect(true);
        }
        
    }, [])


    return (
        <>
         <section class="hero-area">
        <div class="hero-inner">
            <div class="container">
                <div class="row ">
                    <div class="col-lg-6 co-12">
                        <div class="home-slider">
                            <div class="hero-text">
                                <h1 class="wow fadeInUp" data-wow-delay=".3">Institute <br/> Food Review <br/> System</h1>
                                <p class="wow fadeInUp" data-wow-delay=".5s">“One cannot think well, love well, sleep <br/> well if one has not dined well”</p>
                                <p class="wow fadeInUp author" data-wow-delay=".5s"> Virginia Woolf </p>
                                {redirect && <div class="button wow fadeInUp" data-wow-delay=".7s">
                                    <NavLink to="/review" class="btn">Submit Review</NavLink>
                                </div>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </section>
        </>
    )
}