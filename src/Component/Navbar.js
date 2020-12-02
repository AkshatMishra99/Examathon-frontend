import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
export default function Navbar() {
    const unauthenticatedNavbar = () => {
        console.log("unauthenticated");
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">Login</li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">Register</li>
                </Link>
            </>
        );
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand navbar-light bg-light">
                <Link to="/">
                    <div className="navbar-brand">Online Exams</div>
                </Link>
                {/* <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button> */}
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        {unauthenticatedNavbar()}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
