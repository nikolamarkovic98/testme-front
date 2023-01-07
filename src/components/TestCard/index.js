import "./index.css";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDate } from "../../utils/utils";
import { sendAuthHTTP } from "../../requests";

import ResourcesComponent from "../Resources/Resources";
import UserInfo from "../UserInfo/UserInfo";

const TestCard = ({
    _id,
    index,
    title,
    desc,
    resources,
    creator,
    createdAt,
    removeTest,
}) => {
    const { username, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const checkIfPassed = async (e) => {
        e.preventDefault();

        if (!username || !token) {
            navigate("/signin");
            return;
        }

        const query = {
            query: `query{user(username:"${username}"){passedTests{_id}}}`,
        };

        try {
            const res = await sendAuthHTTP(query, token);
            if (res.data.user) {
                const index = res.data.user.passedTests.findIndex(
                    (test) => test._id === _id
                );

                if (index !== -1) {
                    if (
                        window.confirm(
                            "You already completed this test. Are you sure you want to pass it again?"
                        )
                    ) {
                        navigate(`/taketest/${_id}`);
                    }
                } else {
                    navigate(`/taketest/${_id}`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveTest = (_id, token) => {
        const wrap = async () => {
            if (window.confirm("Are you sure you want to delete this test?")) {
                const query = {
                    query: `mutation{removeTest(_id:"${_id}")}`,
                };
                const res = await sendAuthHTTP(query, token);
                if (res.data.removeTest === "Removed") {
                    removeTest(index);
                }
            }
        };

        wrap();
    };

    return (
        <div className="test-box">
            <ResourcesComponent testId={_id} resources={resources} />
            <UserInfo
                username={creator.username}
                createdTestsLen={creator.createdTests.length}
                passedTestsLen={creator.passedTests.length}
            />
            <div className="test-panel">
                <h2>{title}</h2>
                <p className="date">{getDate(createdAt)}</p>
                <p className="desc">{desc}</p>
                <div className="options">
                    {username === creator.username ? (
                        <button
                            className="taketest-btn"
                            onClick={() => handleRemoveTest(_id, token)}
                        >
                            Remove
                        </button>
                    ) : null}
                    <button className="taketest-btn" onClick={checkIfPassed}>
                        Take Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestCard;
