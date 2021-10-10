import Img1 from "./assets/images/logo/footer_logo.png" ;

export default function Footer(){
    return (
        <>
          <footer class="footer">
        <div class="footer-middle">
            <div class="container">
                <img src={Img1} alt="footerLogo"/>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="inner">
                    <div class="row">
                        <div class="col-12">
                            <div class="left">
                                <p>© Copyright 2021 @ IIT Dharwad. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}