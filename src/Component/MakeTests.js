import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import TestAdd from "./TestAdd";
import "./MakeTests.css";
function MakeTests() {
    let { tests, setTests } = useContext(AuthContext);
    let history = useHistory();
    let [classCurr, setClassCurr] = useState("1");
    let [paperTitle, setPaperTitle] = useState("");
    let [noOfQues, setNoOfQues] = useState(0);
    let [makingTest, setMakingTest] = useState(false);
    let [examDur, setExamDur] = useState(0);
    let [examMaxMarks, setExamMaxMarks] = useState();
    let [paper, setPaper] = useState();
    let [bifur, setBifur] = useState(false);
    let [streams, setStreams] = useState({});
    // let selectClass = (e) => {
    //     setClassCurr(e.target.value);
    //     if (parseInt(e.target.value) > 8) {
    //         setBifur(true);
    //         setStreams({ ...tests.classes[e.target.value].streams });
    //     }
    //     setSubjectArray(tests.classes[e.target.value]);
    // };
    // let TestList = [];
    // console.log(subjectArray);
    // let subjects = [];
    // for (let i in subjectArray) {
    //     if (i !== "streams") subjects.push(<option>{i}</option>);
    //     else {
    //     }
    // }
    // let selectSubject = (e) => {
    //     setSub(e.target.value);
    //     console.log(e.target.value);
    // };
    let setQuestions = (e) => {
        setNoOfQues(parseInt(e.target.value));
    };
    let setMaxMarks = (e) => {
        setExamMaxMarks(e.target.value);
    };
    let setDuration = (e) => {
        setExamDur(e.target.value);
    };
    let tempPaper = {};
    let submitHandler = (e) => {
        e.preventDefault();
        tempPaper = {
            "total questions": noOfQues,
            "exam duration": examDur,
            "maximum marks": examMaxMarks,
            "scheduled on": "12/10/2020 00:00:00",
            "negative marking": false,
            questionList: [],
            paperTitle,
        };
        console.log(tempPaper);
        setPaper(tempPaper);
        setMakingTest(true);
    };
    let submitForm = (e) => {
        if (paper.questionList.length === noOfQues) {
            //submitting form in context api and in the data base
            console.log(paper);
            console.log(tests);
            let tempTests = { ...tests };
            tempTests.papers.push(paper);
            setTests(tempTests);
        }
        history.push("/");
    };
    let resetForm = (e) => {
        history.push("/");
    };
    console.log(paper);

    return makingTest ? (
        <div className="make-tests">
            <ul
                className="make-tests-container"
                style={{ listStyleType: "none" }}
            >
                {Array(noOfQues)
                    .fill()
                    .map((_, i) => (
                        <li className="test-add-item">
                            <div>Question {i + 1}</div>
                            <TestAdd
                                stuClass={classCurr}
                                subJ={paperTitle}
                                ind={i + 1}
                                paper={{ ...paper }}
                            />
                        </li>
                    ))}
            </ul>
            <button type="button" class="btn btn-primary" onClick={submitForm}>
                Submit Paper
            </button>
            <button type="button" class="btn btn-warning" onClick={resetForm}>
                Reset
            </button>
        </div>
    ) : (
        <div className="make-tests">
            <h2>Make Your Tests Here </h2>
            <form className="container" onSubmit={submitHandler}>
                <div className="form-group form-inline">
                    <label htmlFor="classes">Select Class:</label>
                    <select
                        className="form-control"
                        id="classes"
                        onChange={(e) => {
                            setClassCurr(e.target.value);
                        }}
                    >
                        {Array(13)
                            .fill()
                            .map((_, i) => {
                                if (i !== 0) return <option>{i}</option>;
                            })}
                    </select>
                </div>
                <div className="form-group form-inline">
                    <label htmlFor="subjects">Select subject:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Enter Paper Title"
                        onChange={(e) => {
                            setPaperTitle(e.target.value);
                        }}
                        required
                    ></input>
                </div>
                <div className="form-group form-inline">
                    <label htmlFor="questions">Enter Maximum Marks</label>
                    <input
                        type="text"
                        className="form-control"
                        id="questions"
                        placeholder="maximum marks"
                        onChange={setMaxMarks}
                        required
                    ></input>
                </div>
                <div className="form-group form-inline">
                    <label htmlFor="questions">
                        Enter Exam Duration in mins:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="questions"
                        placeholder="test duration"
                        onChange={setDuration}
                        required
                    ></input>
                </div>
                <div className="form-group form-inline">
                    <label htmlFor="questions">
                        Enter Number of Questions:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="questions"
                        placeholder="no of questions"
                        onChange={setQuestions}
                        required
                    ></input>
                </div>
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                ></input>
            </form>
        </div>
    );
}

export default MakeTests;
