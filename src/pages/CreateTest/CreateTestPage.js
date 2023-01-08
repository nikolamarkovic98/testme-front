import "./index.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useArray from "../../hooks/useArray";
import { createStr, isURL } from "../../utils/utils";
import { sendAuthHTTP } from "../../requests";

import { Tabs, Tab } from "../../components/Tabs/Tabs";
import Question from "../../components/Question/Question";

const CreateTestPage = () => {
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: "",
    });
    const {
        array: questions,
        setArray: setQuestions,
        push: pushQuestion,
        update: updateQuestion,
        remove: removeQuestion,
    } = useArray();
    const {
        array: resources,
        push: pushResources,
        remove: removeResource,
    } = useArray();
    const [created, setCreated] = useState(false);
    const [message, setMessage] = useState("");

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const resourceRef = useRef(null);

    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const createTest = async () => {
        if (created || !titleRef.current || !descRef.current) return;

        const title = titleRef.current.value.trim();
        if (!title) {
            printMessage("Test must contain title!");
            return;
        }

        const desc = descRef.current.value.trim();
        if (!desc) {
            printMessage("Test must contain description!");
            return;
        }

        if (!questions.length) {
            printMessage("Test must contain some questions!");
            return;
        }

        // create test
        const testQuestions = createStr(JSON.stringify(questions));

        // since it's just string in db I dont need to send generated ids...
        const testResources = resources.reduce(
            (current, next) => `${current} ${next.URL}`,
            ""
        );

        const query = {
            query: `mutation{createTest(testInput:{title:"${title}",desc:"${desc}",questions:"${testQuestions}",resources:"${testResources}"}){ msg }}`,
        };

        try {
            const res = await sendAuthHTTP(query, token);
            if (res.data.createTest) {
                if (res.data.createTest.msg === "Test created!") {
                    setCreated(true);
                }
                printMessage(res.data.createTest.msg);
            }
        } catch (err) {
            printMessage(err);
        }
    };

    const addQuestion = () => {
        if (
            !newQuestion.question.trim() ||
            !newQuestion.A.trim() ||
            !newQuestion.B.trim() ||
            !newQuestion.C.trim() ||
            !newQuestion.D.trim() ||
            !newQuestion.answer
        ) {
            printMessage("All fields are required!");
            return;
        }

        pushQuestion({ id: crypto.randomUUID(), ...newQuestion });
        setNewQuestion({
            question: "",
            A: "",
            B: "",
            C: "",
            D: "",
            answer: "",
        });
    };

    const chageOrder = (index, offset) => {
        const nextIndex = index + offset;
        if (nextIndex === -1 || nextIndex === questions.length) {
            return;
        }

        setQuestions((prevState) => {
            const tmp = prevState[index];
            prevState[index] = prevState[nextIndex];
            prevState[nextIndex] = tmp;
            return [...prevState];
        });
    };

    const addResource = () => {
        const current = resourceRef.current;
        if (!current) return;

        const resource = current.value.trim();
        if (!resource) {
            return;
        }

        if (!isURL(resource)) {
            printMessage("Resource must be a valid URL/link");
            return;
        }

        current.value = "";
        pushResources({ URL: resource, id: crypto.randomUUID() });
    };

    const handleQuestionChange = (e) => {
        setNewQuestion((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const printMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 4000);
    };

    const questionsMap = questions.map((question, index) => (
        <Question
            key={question.id}
            index={index}
            editQuestion={updateQuestion}
            removeQuestion={removeQuestion}
            changeOrder={chageOrder}
            {...question}
        />
    ));

    const resourcesMap = resources.map((resource, index) => (
        <p className="resource" key={resource.id}>
            <a
                href={`${resource.URL}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {resource.URL}
            </a>
            <button
                onClick={() => removeResource(index)}
                className="remove-btn"
            >
                Remove
            </button>
        </p>
    ));

    return (
        <div className="create-test">
            <div className="content-wrap">
                <div className="info">
                    <h1>Create Test</h1>
                    <p>
                        Here you can create your own tests that other people
                        could try to solve!
                    </p>
                </div>
                <div className="panel">
                    <div className="panel-box">
                        <Tabs defaultActiveKey="general">
                            <Tab activeKey="general" title="General">
                                <div className="general-panel wrapper active">
                                    <h2>General</h2>
                                    <p>
                                        Here you can set some of general
                                        information about the test you are about
                                        to create such as title and description.
                                    </p>
                                    <div className="general-panel-box">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Test title"
                                            className="question-input color"
                                            maxLength="40"
                                            ref={titleRef}
                                        />
                                    </div>
                                    <div className="general-panel-box">
                                        <label>Description:</label>
                                        <textarea
                                            placeholder="Test description"
                                            className="question-input color"
                                            maxLength="500"
                                            ref={descRef}
                                        ></textarea>
                                    </div>
                                    <div className="general-panel-box resources-wrapper">
                                        <p>
                                            If you know any useful literature
                                            that could help users pass the test,
                                            you can add it here:
                                        </p>
                                        <div className="resources">
                                            <div className="added-resources">
                                                {resourcesMap}
                                            </div>
                                            <div className="control">
                                                <input
                                                    type="text"
                                                    className="question-input color"
                                                    placeholder="Link"
                                                    ref={resourceRef}
                                                />
                                                <button
                                                    className="classic-btn"
                                                    onClick={addResource}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                        <p
                                            id="resource-msg"
                                            className="msg"
                                        ></p>
                                    </div>
                                </div>
                            </Tab>
                            <Tab activeKey="questions" title="Questions">
                                <div className="question-panel wrapper">
                                    <h2>Add Question</h2>
                                    <div className="question-box">
                                        <label>Question:</label>
                                        <input
                                            type="text"
                                            name="question"
                                            placeholder="(2+2)"
                                            className="question-input color"
                                            onChange={handleQuestionChange}
                                            value={newQuestion.question}
                                        />
                                    </div>
                                    <div className="question-box">
                                        <div className="answer-box">
                                            <label>A)</label>
                                            <input
                                                type="text"
                                                name="A"
                                                className="question-input color"
                                                placeholder="1"
                                                onChange={handleQuestionChange}
                                                value={newQuestion.A}
                                            />
                                        </div>
                                        <div className="answer-box">
                                            <label>B)</label>
                                            <input
                                                type="text"
                                                name="B"
                                                placeholder="2"
                                                className="question-input color"
                                                onChange={handleQuestionChange}
                                                value={newQuestion.B}
                                            />
                                        </div>
                                        <div className="answer-box">
                                            <label>C)</label>
                                            <input
                                                type="text"
                                                name="C"
                                                placeholder="3"
                                                className="question-input color"
                                                onChange={handleQuestionChange}
                                                value={newQuestion.C}
                                            />
                                        </div>
                                        <div className="answer-box">
                                            <label>D)</label>
                                            <input
                                                type="text"
                                                name="D"
                                                placeholder="4"
                                                className="question-input color"
                                                onChange={handleQuestionChange}
                                                value={newQuestion.D}
                                            />
                                        </div>
                                    </div>
                                    <div className="question-box">
                                        <label>Corrent answer:</label>
                                        <div>
                                            <select
                                                name="answer"
                                                onChange={handleQuestionChange}
                                                value={newQuestion.answer}
                                            >
                                                <option></option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="question-box align">
                                        <button
                                            className="classic-btn"
                                            onClick={addQuestion}
                                        >
                                            Add Question
                                        </button>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="panel-box wrapper">
                        <h2>Questions review</h2>
                        {questionsMap}
                    </div>
                </div>
                <div className="create-test-options">
                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                    <button className="classic-btn" onClick={createTest}>
                        Create Test
                    </button>
                </div>
                <p className="msg">{message}</p>
            </div>
        </div>
    );
};

export default CreateTestPage;
