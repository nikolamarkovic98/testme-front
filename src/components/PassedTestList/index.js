import React from "react";
import PassedTestBox from "../PassedTestCard";

const PassedTestList = (props) => {
    const passedTestsMap = props.passedTests.map((passedTest) => (
        <PassedTestBox key={passedTest._id} {...passedTest} />
    ));

    return (
        <div className="passed-test-list">
            <div className="list">
                {passedTestsMap.length ? (
                    passedTestsMap
                ) : (
                    <h1>User didn't complete any tests yet</h1>
                )}
            </div>
        </div>
    );
};

export default PassedTestList;
