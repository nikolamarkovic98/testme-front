import "./index.css";
import React from "react";
import TestList from "../../components/TestList";

const HomePage = (props) => {
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
                    <TestList tests={props.tests} h1={props.h1} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
