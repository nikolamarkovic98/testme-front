import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { sendHTTP } from "./requests";

import Header from "./components/Header";
import Contact from "./components/Contact";
import SignUpPage from "./pages/Auth/SignUp/SignUpPage";
import SignInPage from "./pages/Auth/SignIn/SignInPage";
import CreateTest from "./components/CreateTest";
import User from "./components/User";
import HomePage from "./pages/Home/HomePage";
import TakeTest from "./components/TakeTest";
import Footer from "./components/Footer";
import TestBox from "./components/TestBox";

const App = () => {
    const [state, setState] = useState({
        token: null,
        userId: null,
        username: null,
        test: null,
        tests: [],
    });

    const loadTests = async () => {
        const query = {
            query: `query{tests{_id title desc resources creator{username createdTests{_id} passedTests{_id}} createdAt}}`,
        };

        const res = await sendHTTP(query);
        if (res === undefined || res === null) return;
        if (res.data.tests !== undefined)
            this.setState({ tests: res.data.tests });
    };

    const login = (token, userId, username) => {
        this.setState({
            token: token,
            userId: userId,
            username: username,
        });
    };

    const logout = () => {
        this.setState({
            token: null,
            userId: null,
            username: null,
        });
    };

    const showSearch = (e) => {
        // if user is viewing single test
        // everything with data-id == dialog will make dialog disappear
        const id = e.target.getAttribute("data-id");
        if (id === "dialog") {
            this.setState({ test: null });
            return;
        }

        // if user clicked on search
        if (id === "search") {
            // if this is true then it means we did click on search
            const searchResult = document.querySelector("#search");
            searchResult.style.display = "block";
        } else {
            const searchResult = document.querySelector("#search");
            searchResult.style.display = "none";
        }
    };

    // this method gets called when someone clicks on test in search - then it fetches test and updates state
    // displaying test over page
    const showTest = async (_id) => {
        const query = {
            query: `query{test(_id:"${_id}"){_id title desc resources creator{username createdTests{_id} passedTests{_id}} createdAt}}`,
        };

        const res = await sendHTTP(query);
        if (res === undefined || res === null) return;
        if (res.data.test !== undefined) this.setState({ test: res.data.test });
    };

    return (
        <div className="app">
            {// test dialog
            state.test && (
                <div className="dialog-wrapper" data-id="dialog">
                    <div className="dialog-second-wrapper" data-id="dialog">
                        <div className="dialog-flex" data-id="dialog">
                            <TestBox
                                key={test._id}
                                _id={test._id}
                                title={test.title}
                                desc={test.desc}
                                questions={test.questions}
                                resources={test.resources}
                                creator={test.creator}
                                createdAt={test.createdAt}
                                num_of_passedTests={
                                    test.creator.passedTests.length
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                tests={state.tests}
                                h1={
                                    state.tests.length
                                        ? "Most popular tests"
                                        : "There are no tests yet"
                                }
                            />
                        }
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/createtest" element={<CreateTest />} />
                    <Route path="/taketest/:id" element={<TakeTest />} />
                    <Route path="/user/:id" element={<User />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
