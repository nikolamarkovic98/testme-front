import "./index.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";

import QuestionBox from "../../components/QuestionBox";
import { sendAuthHTTP } from "../../requests";
import { createStr } from "../../utils/utils";

const TakeTestPage = () => {
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { loading, data, setData: setTest } = useFetch(
        {
            query: `query{test(_id: "${id}"){_id title desc questions{_id question answer A B C D} createdAt msg}}`,
        },
        token,
        [id]
    );
    const [completed, setCompleted] = useState(false);
    const [startDate] = useState(new Date());
    const navigate = useNavigate();

    if (loading) return null;

    const { test } = data.data;

    const rateTest = async () => {
        if (completed) {
            return;
        }

        const datesDiff = new Date().getTime() - startDate.getTime();
        const minutes = Math.ceil((datesDiff / 36e5) * 60) - 1;
        const seconds = Math.floor((datesDiff / 1000) % 60);

        // I could even create a new object without questions because I dont really need that on server... later
        const query = {
            query: `mutation{rateTest(test:"${createStr(
                JSON.stringify(test)
            )}",minutes:"${minutes}",seconds:"${seconds}")}`,
        };

        // maybe I could like show the result of test after submitting...
        try {
            const res = await sendAuthHTTP(query, token);
            if (res.data.rateTest) {
                if (res.data.rateTest === "Success") {
                    setCompleted(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        if (
            window.confirm(
                "Are you sure you want to exit? All progress will be lost."
            )
        ) {
            navigate("/");
        }
    };

    const setAnswer = (index, answer) => {
        setTest((prevState) => {
            prevState.questions[index].answer = answer;
            return { ...prevState };
        });
    };

    const questions = test.questions.map((question, index) => {
        return (
            <QuestionBox
                key={question._id}
                index={index}
                id={question._id}
                question={question.question}
                A={question.A}
                B={question.B}
                C={question.C}
                D={question.D}
                setAnswer={setAnswer}
            />
        );
    });

    return (
        <div className="take-test">
            <div className="content-wrap">
                <h1>{test.title} - Test</h1>
                <p>
                    You can go ahead and start answering questions, best of
                    luck!
                </p>
                <div className="questions">{questions}</div>
                <div className="take-test-options">
                    <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="classic-btn" onClick={rateTest}>
                        Finish
                    </button>
                </div>
                <p className="msg">{completed ? "Done" : null}</p>
            </div>
        </div>
    );
};

export default TakeTestPage;
