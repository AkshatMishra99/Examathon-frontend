import React, { useState, useContext } from "react";
import "./Form.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "./Message";
function Form() {
    const history = useHistory();
    let authContext = useContext(AuthContext);
    let [user, setUser] = useState({ username: "", password: "" });
    let [message, setMessage] = useState(null);
    const validateForm = (e) => {
        e.preventDefault();

        AuthService.login(user).then((data) => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setIsAuthenticated(isAuthenticated);
                authContext.setUser(user);
                authContext.setRole(user.role);
                history.replace("/dashboard");
            } else {
                setMessage(message);
            }
        });
    };
    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
        <div className="login-form">
            <h4>Login to Dashboard</h4>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name="username"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={onChangeHandler}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        required
                        onChange={onChangeHandler}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Forgot password ?
                    </small>
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
    );
}

export default Form;
