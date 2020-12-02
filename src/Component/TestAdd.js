import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import TypeQuestion from "./TypeQuestion";
import UploadQuestion from "./UploadQuestion";
import "./TestAdd.css";
function TestAdd({ stuClass, subJ, paper, ind, myObj }) {
    const [choice, setChoice] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const setChoiceTrue = (e) => {
        setChoice(true);
    };
    const setChoiceFalse = (e) => {
        setChoice(false);
    };
    console.log(stuClass, ind, paper, myObj);
    return submitted ? (
        <div className="testadd-container container">
            Question Successfully Submitted
        </div>
    ) : (
        <div className="testadd-container container">
            <div className="testAddHeader">
                <div className="upload-question container">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={"inlineRadioOptions" + ind}
                            id="inlineRadio1"
                            value="option1"
                            onClick={setChoiceTrue}
                            defaultChecked
                        />
                        <label className="form-check-label" for="inlineRadio1">
                            Upload Tests via Image
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={"inlineRadioOptions" + ind}
                            id="inlineRadio2"
                            value="option2"
                            onClick={setChoiceFalse}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                            Type Test via Text
                        </label>
                    </div>
                </div>
            </div>
            <div className="testAddBody container">
                {choice ? (
                    <UploadQuestion
                        stuClass={stuClass}
                        subJ={subJ}
                        submit={(isSubmit) => setSubmitted(isSubmit)}
                        paper={{ ...paper }}
                    />
                ) : (
                    <TypeQuestion
                        stuClass
                        subJ
                        submit={(isSubmit) => setSubmitted(isSubmit)}
                        paper={{ ...paper }}
                    />
                )}
            </div>
        </div>
    );
}

export default TestAdd;
