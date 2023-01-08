import "./index.css";
import React, { useState } from "react";
import useToggle from "../../hooks/useToggle";

const answerOptions = ["A", "B", "C", "D"];

// Component that displays question on CreateTestPage
const Question = ({
    index,
    id,
    question,
    answer,
    A,
    B,
    C,
    D,
    editQuestion,
    removeQuestion,
    changeOrder,
}) => {
    const [questionData, setQuestionData] = useState({
        question,
        answer,
        A,
        B,
        C,
        D,
    });
    const [edit, setEdit] = useToggle(false);
    const [showContent, setShowContent] = useToggle(false);

    const handleEdit = () => {
        setEdit();
        if (edit) {
            editQuestion(index, {
                id,
                ...questionData,
            });
        }
    };

    const handleShowContent = () => {
        if (edit) return;
        setShowContent();
    };

    const handleChange = (e) => {
        setQuestionData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="question">
            <div data-testid="content" onClick={handleShowContent}>
                <div className="index">{index + 1})</div>
                <div
                    className="arrow-up arrows"
                    onClick={() => changeOrder(index, -1)}
                ></div>
                <div
                    className="arrow-down arrows"
                    onClick={() => changeOrder(index, 1)}
                ></div>
                <div className="question-box added">
                    <label>Question:</label>
                    <input
                        data-testid="question"
                        type="text"
                        className={"question-input" + (edit ? " edit" : "")}
                        name="question"
                        readOnly={!edit}
                        value={questionData.question}
                        onChange={handleChange}
                    />
                </div>
                <div className={"content" + (showContent ? " show" : "")}>
                    <div className="question-box added">
                        {answerOptions.map((option) => (
                            <div key={option} className="answer-box">
                                <label>{option})</label>
                                <input
                                    data-testid="option"
                                    type="text"
                                    className={
                                        "question-input" + (edit ? " edit" : "")
                                    }
                                    name={option}
                                    readOnly={!edit}
                                    value={questionData[option]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="question-box align added">
                        <label>Corrent answer:</label>
                        <select
                            data-testid="answer"
                            name="answer"
                            disabled={!edit}
                            value={questionData.answer}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                </div>
            </div>
            {showContent ? (
                <div className="question-box">
                    <button
                        data-testid="edit-btn"
                        className="classic-btn"
                        onClick={handleEdit}
                    >
                        {edit ? "Save" : "Edit"}
                    </button>
                </div>
            ) : null}
            <button className="del-btn" onClick={() => removeQuestion(index)}>
                &times;
            </button>
        </div>
    );
};

export default Question;
