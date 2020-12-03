import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import "./ViewTests.css";
function ViewTests() {
    // alert-dismissible fade show // <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    let { tests, setTests } = useContext(AuthContext);
    let papers = tests.papers;
    let i = 0;
    console.log(papers);

    let coll = [];

    papers.forEach((paper, index) => {
        let cols = [];
        Array(paper).map((field) => {
            for (let i in field) {
                if (
                    typeof field[i] === "string" ||
                    typeof field[i] === "number"
                )
                    cols.push(<td>{field[i]}</td>);
                if (typeof field[i] === "boolean")
                    cols.push(<td>{field[i] ? "YES" : "NO"}</td>);
                console.log(field[i]);
            }
        });
        console.log(cols);
        coll.push(
            <tr>
                <td>{index}</td>
                {cols}
            </tr>
        );
    });

    console.log(coll);
    return (
        <div className="view-tests">
            <table id="papers">
                <tbody>
                    <tr>
                        <th>Serial No</th>
                        <th>Paper Title</th>
                        <th>Scheduled On</th>
                        <th>No of Questions</th>
                        <th>Exam Duration</th>
                        <th>Maximum Marks</th>
                        <th>Negative Marking</th>
                    </tr>
                    {coll}
                </tbody>
            </table>
        </div>
    );
}

export default ViewTests;
