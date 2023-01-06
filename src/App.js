import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { sendHTTP } from "./requests";

import Header from "./components/Header";
import ContactPage from "./pages/Contact/ContantPage";
import SignUpPage from "./pages/Auth/SignUp/SignUpPage";
import SignInPage from "./pages/Auth/SignIn/SignInPage";
import CreateTestPage from "./pages/CreateTest/CreateTestPage";
import UserPage from "./pages/User/UserPage";
import HomePage from "./pages/Home/HomePage";
import TakeTest from "./pages/TakeTest";
import Footer from "./components/Footer";
import TestCard from "./components/TestCard";
import { useSelector } from "react-redux";

const App = () => {
    const { token } = useSelector((state) => state.auth);

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
            false && (
                <div className="dialog-wrapper" data-id="dialog">
                    <div className="dialog-second-wrapper" data-id="dialog">
                        <div className="dialog-flex" data-id="dialog">
                            <TestCard
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
                    {!token && (
                        <Route
                            path="/createtest"
                            element={<Navigate to="/signin" />}
                        />
                    )}

                    {!token && (
                        <Route
                            path="/taketest/:id"
                            element={<Navigate to="/signin" />}
                        />
                    )}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/createtest" element={<CreateTestPage />} />
                    <Route path="/taketest/:id" element={<TakeTest />} />
                    <Route path="/user/:id" element={<UserPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
