import "../index.css";
import React from "react";
import { Link } from "react-router-dom";
import { sendHTTP } from "../../../requests";

const SignInPage = () => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        // validation
        if (!(username !== "" && password !== "")) {
            displayMessage("msg", "All fields are required", "red");
            return;
        }

        const query = {
            query: `query{login(username:"${username}",password:"${password}"){username token userId tokenExpiration msg}}`,
        };

        // everything good send request
        const res = await sendHTTP(query);
        if (res === undefined || res === null) return;
        if (res.data.login !== undefined) {
            if (res.data.login.msg === "Wrong credentials") {
                document.querySelector(
                    "#msg"
                ).innerHTML = `${res.data.login.msg}!`;
                return;
            }
            this.context.login(
                res.data.login.token,
                res.data.login.userId,
                res.data.login.username
            );
        }
    };

    return (
        <div className="auth-wrapper section">
            <div className="sign-in auth">
                <h1>
                    Sign<span className="span-color">In</span>
                </h1>
                <form>
                    <div className="form-box">
                        <label>Username:</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="form-box">
                        <label>Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="form-box">
                        <button
                            type="submit"
                            className="classic-btn"
                            onClick={handleSubmit}
                        >
                            SignIn
                        </button>
                        <p className="or">
                            Dont have an account?{" "}
                            <Link to="/signup">SignUp</Link>
                        </p>
                    </div>
                </form>
                <p id="msg" className="msg"></p>
            </div>
        </div>
    );
};

export default SignInPage;
