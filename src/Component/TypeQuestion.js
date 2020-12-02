import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function TypeQuestion() {
    let { tests, setTests } = useContext(AuthContext);
    let [question, setQuestion] = useState({ q: "", o: [] });
    let [q, setQ] = useState("");
    let [o, setO] = useState([]);
    let [temp, setTemp] = useState("");
    let addOption = (e) => {
        if (temp.length > 0) {
            e.preventDefault();
            let tempO = [...o];
            tempO.push(temp);
            setO(tempO);
            console.log(o);
        }
    };
    let setOptions = (e) => {
        setTemp(e.target.value);
        console.log(temp);
    };
    let setQues = (e) => {
        setQ(e.target.value);
    };
    return (
        <div className="type-question">
            <form>
                <div className="form-group">
                    <label for="formGroupExampleInput">
                        Type Your Question
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Enter Questions"
                        onChange={setQues}
                    />
                </div>
                {/* <div className="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Another input placeholder"
                    />
                </div> */}
                <div className="form-row align-items-center">
                    <div className="col-sm-3 my-1">
                        <label className="sr-only" for="inlineFormInputName">
                            Add Options
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputName"
                            placeholder="Add Options"
                            required
                            onChange={setOptions}
                        />
                    </div>
                    <div className="col-auto my-1">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={addOption}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TypeQuestion;
