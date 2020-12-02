import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import AuthService from "../Services/AuthService";
function Register(props) {
    const history = useHistory();
    let [user, setUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "user",
    });
    let [message, setMessage] = useState(null);
    console.log(user);
    let timerId = useRef(null);
    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        };
    }, []);
    const validateForm = (e) => {
        e.preventDefault();

        AuthService.register(user).then((data) => {
            const { message } = data;
            console.log(data);
            setMessage(message);

            if (!message.msgError) {
                timerId = setTimeout(() => {
                    history.push("/");
                }, 2000);
            }
        });
    };
    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
        <div className="container home">
            <div className="login container">
                <div className="login-form" style={{ alignItems: "center" }}>
                    <h4 style={{ textAlign: "center" }}>Register</h4>
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                name="username"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Email address"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                required
                                onChange={onChangeHandler}
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                id="exampleInputfirstName1"
                                required
                                onChange={onChangeHandler}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="exampleInputlastName1"
                                required
                                onChange={onChangeHandler}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                id="exampleInputphoneNumber1"
                                required
                                placeholder="Phone Number"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <Link to="/dashboard">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: "100%" }}
                                onClick={validateForm}
                            >
                                Submit
                            </button>
                        </Link>
                    </form>
                    {message ? <Message message={message} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Register;
