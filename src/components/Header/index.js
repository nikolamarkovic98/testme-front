import "./index.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../hooks/useToggle";
import useDebounce from "../../hooks/useDebounce";
import { signOut } from "../../store/authSlice";
import { sendHTTP } from "../../requests";

import TestIcon from "./test-icon.png";
import { Link } from "react-router-dom";
import ContactIcon from "./contact_icon.svg";

const animation = (loading) => {
    if (loading.innerHTML.slice(7, 7 + 3) === "...") {
        loading.innerHTML = "Loading";
        return;
    }
    loading.innerHTML += ".";
};

// checks if input is empty and resets lists - I need this as function because onChange bugs a little so I need additional check on onFocus
const check = (e, setTests, setUsers) => {
    if (e.target.value === "") {
        setUsers([]);
        setTests([]);
        return true;
    }
    return false;
};

const search = async (e, setTests, setUsers) => {
    if (check(e, setTests, setUsers)) return;

    const query = {
        query: `query{search(search:"${e.target.value}"){users{username firstName lastName} tests{_id title} msg}}`,
    };

    const loading = document.querySelector("#loading");

    loading.style.display = "inline-block";
    const interval = setInterval(() => animation(loading), 200);
    const res = await sendHTTP(query);
    clearInterval(interval);
    loading.style.display = "none";

    if (res === undefined || res === null) return;
    if (res.data.search !== undefined) {
        if (res.data.search.users.length !== 0) {
            // I dont want more than three items in search
            if (res.data.search.users.length > 3) {
                setUsers(res.data.search.users.splice(0, 3));
            } else {
                setUsers(res.data.search.users);
            }
        } else setUsers([]);

        if (res.data.search.tests.length !== 0) {
            // I dont want more than three items in search
            if (res.data.search.tests.length > 3) {
                setTests(res.data.search.tests.splice(0, 3));
            } else {
                setTests(res.data.search.tests);
            }
        } else setTests([]);
    }
};

const Header = (props) => {
    const [search, setSearch] = useState("");
    const [tests, setTests] = useState([]);
    const [users, setUsers] = useState([]);

    const [toggle, setToggle] = useToggle(false);

    const { username, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useDebounce(
        () => {
            console.log(search);
        },
        1000,
        [search]
    );

    return (
        <header>
            <div className="content-wrap">
                <div className="header-box">
                    <h2 className="logo">
                        <Link to="/">testMe</Link>
                    </h2>
                </div>
                <div className="header-box header-box-search">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <span id="loading">Loading</span>
                    </div>
                    {
                        <ul id="search">
                            {// I actually want to display one user and one test and so on... I need a for loop for this
                            users.map((user, index) => {
                                return (
                                    <li key={Math.random()}>
                                        <Link to={`/user/${user.username}`}>
                                            <div>
                                                <img
                                                    src={ContactIcon}
                                                    className="user-image"
                                                    alt="Cant display contact icon"
                                                />
                                            </div>
                                            <div>
                                                <p>{`${user.firstName} ${user.lastName}`}</p>
                                                <p>{user.username}</p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                            {tests.map((test) => {
                                return (
                                    <li
                                        key={test._id}
                                        className="search-test"
                                        // onClick={(e) =>
                                        //     context.showTest(test._id)
                                        // }
                                    >
                                        <img
                                            src={TestIcon}
                                            className="user-image"
                                            alt="Cant display contact icon"
                                        />
                                        <span>{test.title}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    }
                </div>
                <div className="header-box">
                    {!token ? (
                        <nav>
                            <ul className="nav">
                                <li className="auth-link">
                                    <Link to="/signup">SignUp</Link>
                                </li>
                                <li className="auth-link">
                                    <Link to="/signin">SignIn</Link>
                                </li>
                            </ul>
                            <div className="toggle">
                                <div
                                    className="hamburger"
                                    onClick={(e) => {
                                        document
                                            .querySelector("#hamburger-nav")
                                            .classList.toggle("hide");
                                    }}
                                >
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <ul id="hamburger-nav" className="hide">
                                    <li className="home">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="auth-link">
                                        <Link to="/signup">SignUp</Link>
                                    </li>
                                    <li className="auth-link">
                                        <Link to="/signin">SignIn</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    ) : (
                        <ul>
                            <li>
                                <span onClick={setToggle}>
                                    {username} | &#8595;
                                </span>
                                <ul className={!toggle ? "hide" : ""}>
                                    <li className="home">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to={`/user/${username}`}>
                                            Your profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/createtest">
                                            Create test
                                        </Link>
                                    </li>
                                    <li onClick={() => dispatch(signOut())}>
                                        <Link to="/">SignOut</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
