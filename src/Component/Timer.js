import React, { useState, useRef, useEffect } from "react";
import "./Timer.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Timer() {
    let [minutes, setMinutes] = useState("00");
    let [seconds, setSeconds] = useState("00");
    let interval = useRef();
    const makeTwoDigits = (str) => {
        if (str.length < 2) str = "0" + str;
        return str;
    };
    const startTimer = () => {
        const countDownTime = new Date().getTime() + 120 * 1000;
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownTime - now;
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance <= 0) {
                clearInterval(interval);
            } else {
                setMinutes(makeTwoDigits(minutes + ""));
                setSeconds(makeTwoDigits(seconds + ""));
            }
            console.log(distance, minutes, seconds, countDownTime);
        }, 1000);
    };
    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="bigCounter">
            <div className="Calendar">
                <FontAwesomeIcon icon={faClock} />
            </div>
            <div className="two">{minutes}</div>
            <div className="one">{seconds}</div>
        </div>
    );
}

export default Timer;
