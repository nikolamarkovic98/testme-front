import "./index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendHTTP } from "../../requests";

import TestCard from "../TestCard";

const TestList = () => {
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

    const removeTest = (index) => {
        setTests((prevState) => {
            prevState.splice(index, 1);
            return [...prevState];
        });
    };

    const testsMap = tests.map((test) => (
        <TestCard key={test._id} hideTest={removeTest} {...test} />
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
