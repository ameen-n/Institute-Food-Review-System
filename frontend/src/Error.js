import { NavLink } from "react-router-dom"
import Navbar from "./Components/Navbar"

export default function Error() {
    return (
        <>
        <Navbar />
            <div>
            <div className="breadcrumbs" style={{position:"static"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-12">
                            <div className="breadcrumbs-content">
                                <h1 className="page-title">Error Page</h1>
                            </div>
                            <ul className="breadcrumb-nav">
                                <li><NavLink exact to="/">Home</NavLink></li>
                                <li>Error 404</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                <section className="error-page section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="error-image">
                                    <img src="./images/error.svg" alt="domvd" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="error-text">
                                    <h2><span>Sorry!</span>Page Not Found</h2>
                                    <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                                    <div className="button">
                                        <NavLink exact to="/" className="btn">Go Homepage</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section></div>
        </>
    )
}