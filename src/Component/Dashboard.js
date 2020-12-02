import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Tests from "./Tests";
import MakeTests from "./MakeTests";
import "./Dashboard.css";
import { AuthContext } from "../Context/AuthContext";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../Services/AuthService";
import ViewTests from "./ViewTests";

function Dashboard() {
    const history = useHistory();
    const {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        role,
    } = useContext(AuthContext);
    let [menuCurrent, setMenuCurrent] = useState("make-test");
    const onClickLinkHandler = (e) => {
        e.target.classList.add("active");
        let itemsList = document.querySelectorAll(".sidebar-items");
        itemsList.forEach((item, index) => {
            if (item !== e.target) item.classList.remove("active");
        });
        if (e.target.id === "make-test") setMenuCurrent(e.target.id);
        else if (e.target.id === "view-test") setMenuCurrent(e.target.id);
    };
    const logoutHandler = () => {
        AuthService.logout().then((data) => {
            const { isAuthenticated, user } = data;
            setIsAuthenticated(false);
            setUser(user);
            history.replace("/");
        });
    };
    const userNavbar = () => {
        return (
            <>
                <ul className="nav flex-column">
                    <li
                        className="nav-item sidebar-items active"
                        onClick={onClickLinkHandler}
                    >
                        Dashboard
                    </li>
                    <li
                        className="nav-item sidebar-items"
                        onClick={onClickLinkHandler}
                    >
                        Study Materials
                    </li>
                    <li
                        className="nav-item sidebar-items"
                        onClick={onClickLinkHandler}
                    >
                        Online Classes
                    </li>
                    <li
                        className="nav-item sidebar-items"
                        onClick={onClickLinkHandler}
                    >
                        Practice Tests
                    </li>
                </ul>
            </>
        );
    };
    const adminNavbar = () => {
        return (
            <>
                <ul className="nav flex-column">
                    <li
                        className="nav-item sidebar-items active"
                        onClick={onClickLinkHandler}
                        id="make-test"
                    >
                        Make Tests
                    </li>
                    <li
                        className="nav-item sidebar-items"
                        onClick={onClickLinkHandler}
                        id="view-test"
                    >
                        View Tests
                    </li>
                    <li
                        className="nav-item sidebar-items disabled"
                        onClick={onClickLinkHandler}
                    >
                        View Results
                    </li>
                    <li
                        className="nav-item sidebar-items"
                        onClick={onClickLinkHandler}
                    >
                        Student Data
                    </li>
                </ul>
            </>
        );
    };
    return isAuthenticated ? (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-header sidebar-items">
                    {role === "admin" ? "Admin Panel" : "Online classes"}
                </div>
                {role === "admin" ? adminNavbar() : userNavbar()}
            </div>
            <div className="dashboard-container">
                <div className="mainbar">
                    <div className="mainbar-header">
                        <span className="mainbar-header-title">Dashboard</span>

                        <div className="active-user dropdown">
                            <a
                                className="dropdown-toggle"
                                href="#"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                style={{
                                    padding: "0",
                                    "text-decoration": "none",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faUserTie}
                                    className="user-icon"
                                />
                                <span className="username">
                                    {user.firstName + " " + user.lastName}
                                </span>
                            </a>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                            >
                                <a className="dropdown-item" href="#">
                                    My profile
                                </a>
                                <a className="dropdown-item disabled" href="#">
                                    My results
                                </a>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={logoutHandler}
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mainbar-content">
                        {role === "admin" ? (
                            menuCurrent === "make-test" ? (
                                <MakeTests />
                            ) : (
                                <ViewTests />
                            )
                        ) : (
                            <Tests />
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <span>You are not authorized to view this page.</span>
        </div>
    );
}

export default Dashboard;
