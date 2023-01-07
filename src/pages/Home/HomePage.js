import "./index.css";
import React from "react";
import useFetch from "../../hooks/useFetch";
import TestList from "../../components/TestList";

const HomePage = () => {
    const { loading, data } = useFetch({
        query: `query{tests{ _id title desc createdAt creator{ _id username createdTests{ _id } passedTests{ _id } } }}`,
    });

    if (loading) return null;

    const { tests } = data.data;

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
