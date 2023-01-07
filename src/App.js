import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";

import Header from "./components/Header";
import ContactPage from "./pages/Contact/ContantPage";
import SignUpPage from "./pages/Auth/SignUp/SignUpPage";
import SignInPage from "./pages/Auth/SignIn/SignInPage";
import CreateTestPage from "./pages/CreateTest/CreateTestPage";
import UserPage from "./pages/User/UserPage";
import HomePage from "./pages/Home/HomePage";
import TakeTest from "./pages/TakeTest";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const App = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <div className="app">
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
