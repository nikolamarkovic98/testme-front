import "../index.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendHTTP } from "../../../requests";
import { useDispatch } from "react-redux";

import { signIn } from "../../../store/authSlice";

const SignInPage = () => {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!signInData.username.trim() || !signInData.password.trim()) {
            printMessage("All fields are required");
            return;
        }

        const query = {
            query: `query{login(username:"${signInData.username}",password:"${signInData.password}"){username token userId tokenExpiration msg}}`,
        };

        // everything good send request
        try {
            const res = await sendHTTP(query);
            if (res.data.login) {
                if (res.data.login.msg === "Success!") {
                    dispatch(
                        signIn({
                            username: res.data.login.username,
                            userId: res.data.login.userId,
                            token: res.data.login.token,
                        })
                    );
                    navigate("/");
                }
                printMessage(res.data.login.msg);
            }
        } catch (err) {
            printMessage(err);
        }
    };

    const handleChange = (e) => {
        setSignInData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const printMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 4000);
    };

    return (
        <div className="auth-wrapper section">
            <div className="sign-in auth">
                <h1>
                    Sign<span className="span-color">In</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            onChange={handleChange}
                            value={signInData.username}
                        />
                    </div>
                    <div className="form-box">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            onChange={handleChange}
                            value={signInData.password}
                        />
                    </div>
                    <div className="form-box">
                        <button type="submit" className="classic-btn">
                            SignIn
                        </button>
                        <p className="or">
                            Dont have an account?{" "}
                            <Link to="/signup">SignUp</Link>
                        </p>
                    </div>
                </form>
                <p className="msg">{message}</p>
            </div>
        </div>
    );
};

export default SignInPage;
