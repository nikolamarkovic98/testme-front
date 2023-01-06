import React from "react";
import ResourcesComponent from "../Resources/Resources";
import UserInfoComponent from "../UserInfo/UserInfo";
import { getDate } from "../../utils/utils";

const PassedTestCard = ({
    _id,
    title,
    creator,
    resources,
    createdAt,
    score,
    minutes,
    seconds,
    grade,
}) => {
    return (
        <div className="test-box">
            <ResourcesComponent testId={_id} resources={resources} />
            <UserInfoComponent
                username={creator.username}
                createdTestsLen={creator.createdTests.length}
                passedTestsLen={creator.passedTests.length}
            />
            <div className="test-panel">
                <h2>{title}</h2>
                <p className="date">{getDate(createdAt)}</p>
                <hr />
                <p>Percentage of correct answers: {score}</p>
                <p>Test complete duration: {`${minutes}:${seconds}`}</p>
                <p>Grade: {grade}</p>
            </div>
        </div>
    );
};

export default PassedTestCard;
