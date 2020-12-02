import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Dashboard from "./Component/Dashboard";
import Register from "./Component/Register";
function App() {
    return (
        <Router>
            <Route exact path="/">
                <Navbar />
                <Home />
            </Route>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register">
                <Navbar />
                <Register />
            </Route>
        </Router>
    );
}

export default App;
