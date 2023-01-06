import "./index.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserImage from "./contact_icon.svg";
import { getDate } from "../../helpers";
import { sendAuthHTTP } from "../../requests";
import { useSelector } from "react-redux";

const TestCard = (props) => {
    const {
        _id,
        index,
        title,
        desc,
        resources,
        creator,
        createdAt,
        hideTest,
    } = props;

    const [showResources, setShowResources] = useState(false);
    const { username, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const resourcesMap = resources
        ? resources.split(" ").map((resource, index) => {
              if (index === 0) return;
              return (
                  <div key={_id + index} className="resource">
                      &#8594;{" "}
                      <a href={resource} target="_blank">
                          {resource}
                      </a>
                  </div>
              );
          })
        : null;

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

                // if match znaci da je vec polagao ovaj test
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

    const removeTest = (_id, token) => {
        const wrap = async () => {
            if (window.confirm("Are you sure you want to delete this test?")) {
                const query = {
                    query: `mutation{removeTest(_id:"${_id}")}`,
                };
                const res = await sendAuthHTTP(query, token);
                if (res.data.removeTest === "Removed") {
                    hideTest(index);
                }
            }
        };

        wrap();
    };

    return (
        <div className="test-box">
            <div className={"resource-box" + (showResources ? " display" : "")}>
                <div
                    className="resource-header"
                    onClick={() => {
                        setShowResources((prev) => !prev);
                    }}
                >
                    {showResources ? <>&#8679;</> : <>&#8681;</>}
                </div>
                <div className={"resource-wrapper"}>
                    <h2>List of sites that you could find useful:</h2>
                    <div className="resources">
                        {resourcesMap ? resourcesMap : <div>Empty</div>}
                    </div>
                </div>
            </div>
            <div className="user-panel">
                <Link
                    to={`/user/${creator.username}`}
                    className="user-panel-box"
                    data-id="dialog"
                >
                    <img
                        className="user-image"
                        data-id="dialog"
                        src={UserImage}
                        alt="Can't load user image"
                    />
                    <div data-id="dialog">
                        <p>
                            <span className="test-creator" data-id="dialog">
                                {creator.username}
                            </span>
                        </p>
                        <p data-id="dialog">
                            Created tests: {creator.createdTests.length}
                        </p>
                        <p data-id="dialog">
                            Passed tests: {creator.passedTests.length}
                        </p>
                    </div>
                </Link>
                <div className="user-panel-box">
                    {username === creator.username ? (
                        <span onClick={() => removeTest(_id, token)}>
                            &times;
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="test-panel">
                <h2>{title}</h2>
                <p className="date">{getDate(createdAt)}</p>
                <p className="desc">{desc}</p>
                <div className="options">
                    <button
                        className="taketest-btn"
                        onClick={checkIfPassed}
                        data-id="dialog"
                    >
                        Take Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestCard;
