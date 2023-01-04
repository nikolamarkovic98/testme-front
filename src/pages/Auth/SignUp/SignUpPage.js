import "../index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendHTTP } from "../../../requests";
import { displayMessage } from "../../../helpers";

const SignUpPage = (props) => {
    const [message, setMessage] = useState("");
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !state.firstName.trim() ||
            !state.lastName.trim() ||
            !state.email.trim() ||
            !state.username.trim() ||
            !state.password.trim() ||
            !state.passwordConfirm.trim()
        ) {
            setMessage("All fields are required!");
            setTimeout(() => setMessage(""), 4000);
            return;
        }

        if (state.password !== state.passwordConfirm) {
            setMessage("Passwords do not match");
            setTimeout(() => setMessage(""), 4000);
            return;
        }

        // everything ok make request
        const query = {
            query: `mutation{createUser(userInput:{firstName:"${state.firstName}",lastName:"${state.lastName}", email:"${state.email}", username:"${state.username}",password:"${state.password}"}){msg}}`,
        };

        const res = await sendHTTP(query);
        if (res === undefined || res === null) return;
        if (res.data.createUser !== undefined) {
            if (
                res.data.createUser.msg === "Username already taken" ||
                res.data.createUser.msg === "Email already taken"
            ) {
                setMessage(res.data.createUser.msg);
                return;
            }
            setMessage(res.data.createUser.msg);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="sign-up auth">
                <h1>
                    Sign<span className="span-color">Up</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        <label>First Name:</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Last Name:</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Email:</label>
                        <input
                            autoComplete="off"
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Username:</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Password:</label>
                        <input
                            autoComplete="off"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Confirm password:</label>
                        <input
                            autoComplete="off"
                            type="password"
                            name="passwordConfirm"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <button type="submit" className="classic-btn">
                            SignUp
                        </button>
                        <p className="or">
                            Already have an account?{" "}
                            <Link to="/signin">SignIn</Link>
                        </p>
                    </div>
                </form>
                <p className="msg">{message}</p>
            </div>
        </div>
    );
};

export default SignUpPage;
