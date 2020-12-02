import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
function UploadQuestion({ stuClass, subJ, submit, paper }) {
    const [questionIMG, setQuestionIMG] = useState(null);
    const [corrAns, setCorrAns] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [hasOptions, setHasOptions] = useState(false);
    const [noOfOptions, setNoOfOptions] = useState(0);
    const onFileChange = (e) => {
        let files = e.target.files;
        setQuestionIMG(files);
        console.warn("data file", files);
    };
    const setCorrAnsHandle = (e) => {
        setCorrAns(e.target.value);
    };
    let { tests, setTests } = useContext(AuthContext);
    let disableAll = () => {
        setSubmitted(true);
        submit(true);
    };
    const addTestsToContext = (e) => {
        if (questionIMG === null) {
            alert("Choose Question Image!");
        } else if (corrAns.length === 0) {
            alert("Correct Answer not given!");
        } else {
            try {
                let question = {
                    ques: questionIMG,
                    isIMG: true,
                    corrAns,
                    hasOptions,
                    noOfOptions,
                };
                //Adding Questions to the Tests in the Context API
                console.log(paper);
                paper.questionList.push(question);
                console.log(paper);
                disableAll();
            } catch (err) {
                console.log(err);
            }
        }
    };
    return submitted ? (
        <div>Question Successfully Submitted</div>
    ) : (
        <div className="upload-question">
            <form>
                <div className="form-group">
                    <label for="exampleFormControlFile1">Upload Question</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="exampleFormControlFile1"
                        name="question"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={(e) => {
                            onFileChange(e);
                        }}
                        required
                    />
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                        required
                        onChange={(e) => {
                            setHasOptions(true);
                        }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                        Has Options
                    </label>
                </div>
                {hasOptions ? (
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label
                                className="input-group-text"
                                for="inputGroupSelect01"
                            >
                                Options
                            </label>
                        </div>
                        <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            onChange={(e) => setNoOfOptions(e.target.value)}
                        >
                            <option selected>Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                        </select>
                    </div>
                ) : null}

                <div className="form-group">
                    <label for="inputAddress">Enter Correct Option</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Option or Answer"
                        onChange={setCorrAnsHandle}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={addTestsToContext}
                >
                    Upload Question
                </button>
            </form>
        </div>
    );
}

export default UploadQuestion;
