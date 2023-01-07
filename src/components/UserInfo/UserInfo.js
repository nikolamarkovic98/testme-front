import "./index.css";
import React from "react";
import { Link } from "react-router-dom";

import UserImage from "./contact_icon.svg";

const UserInfoComponent = ({ username, createdTestsLen, passedTestsLen }) => {
    return (
        <Link to={`/user/${username}`} className="user-info">
            <img className="user-image" src={UserImage} alt="Not found" />
            <div>
                <h3>{username}</h3>
                <p>Created tests: {createdTestsLen}</p>
                <p>Passed tests: {passedTestsLen}</p>
            </div>
        </Link>
    );
};

export default UserInfoComponent;
