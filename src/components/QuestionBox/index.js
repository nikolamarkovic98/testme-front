import "./index.css";
import React from "react";

const answers = ["A", "B", "C", "D"];

// Component that displays question on TakeTestPage - once the user starts the test
const QuestionBox = (props) => {
    const { question, index, setAnswer } = props;

    return (
        <div className="question">
            <div className="question-box">
                <h2>{question}?</h2>
            </div>
            {answers.map((answer) => (
                <div className="question-box">
                    <label className="under">A)</label>
                    <input
                        type="radio"
                        value={answer}
                        onChange={(e) => setAnswer(index, e.target.value)}
                    />
                    <label htmlFor={props[answer]}>{props[answer]}</label>
                </div>
            ))}
        </div>
    );
};

export default QuestionBox;
