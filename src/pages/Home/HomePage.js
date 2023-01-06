import "./index.css";
import React, { useEffect, useState } from "react";
import TestList from "../../components/TestList";
import { sendHTTP } from "../../requests";

const HomePage = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            const query = {
                query: `query{tests{ _id title desc creator{ _id username createdTests{ _id } passedTests{ _id } } }}`,
            };

            try {
                const res = await sendHTTP(query);
                if (res.data.tests) {
                    setTests(res.data.tests);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchTests();
    }, []);

    return (
        <div className="home">
            <div className="landing">
                <div className="bg"></div>
                <div className="content content-wrap">
                    <h1>Test your knowledge</h1>
                    <p>
                        testMe is platform where you can create all sorts of
                        tests that other people can take and see how much they
                        (dont) know :)
                    </p>
                </div>
            </div>
            <div className="content-wrap">
                <div className="home-wrapper">
                    <h1>Tests:</h1>
                    <TestList tests={tests} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
