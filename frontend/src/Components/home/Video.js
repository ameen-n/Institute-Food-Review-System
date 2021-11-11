import Img1 from "../../assets/images/general/keervani.jpg";
import Img2 from "../../assets/images/general/bhoopali.jpg";

export default function Video(){
    return (
        <>
          <section class="intro-video-area overlay section">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="section-title white-text">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Keervani Mess</h2>
                        <img src={Img1} alt="Bhoopali"/>
                    </div>
                </div>
                <div class="col">
                    <div class="section-title white-text">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Bhoopali Mess</h2>
                        <img src={Img2} alt="Keervani"/>
                    </div>
                </div>
            </div>
        </div>    
    </section>
        </>
    )
}