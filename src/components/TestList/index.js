import "./index.css";
import React from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import useArray from "../../hooks/useArray";
import { Link } from "react-router-dom";

import TestCard from "../TestCard";

const TestList = (props) => {
    const { array: tests, setArray: setTests, remove: removeTest } = useArray(
        props.tests
    );

    useUpdateEffect(() => {
        setTests(props.tests);
    }, [props.tests]);

    const testsMap = tests.map((test) => (
        <TestCard key={test._id} removeTest={removeTest} {...test} />
    ));

    return (
        <div className="test-list">
            <div className="list">
                <Link to="/createtest" className="classic-btn">
                    Create Test
                </Link>
                {testsMap}
            </div>
        </div>
    );
};

export default TestList;
