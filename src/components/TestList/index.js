import "./index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendHTTP } from "../../requests";

import TestBox from "../TestBox";

const TestList = (props) => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const loadTests = async () => {
            const query = {
                query: `query{tests{_id title desc resources creator{username createdTests{_id} passedTests{_id}} createdAt}}`,
            };

            const res = await sendHTTP(query);
            if (!res) return;
            if (res.data.tests) {
                setTests(res.data.tests);
            }
        };

        loadTests();
    }, []);

    const testsMap = tests.map((test) => {
        // I need to check the way I get num_of_passedTests because I send it differently in App and in User components
        let num_of_passedTests;
        if (test.creator.passedTests !== undefined)
            num_of_passedTests = test.creator.passedTests.length;
        else if (props.num_of_passedTests !== undefined)
            num_of_passedTests = props.num_of_passedTests;

        return (
            <TestBox
                key={test._id}
                _id={test._id}
                title={test.title}
                desc={test.desc}
                resources={test.resources}
                questions={test.questions}
                creator={test.creator}
                createdAt={test.createdAt}
                num_of_passedTests={num_of_passedTests}
            />
        );
    });

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
