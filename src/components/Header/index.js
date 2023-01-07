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

const Header = () => {
    const [search, setSearch] = useState("");
    const [tests, setTests] = useState([]);
    const [users, setUsers] = useState([]);

    const [toggle, setToggle] = useToggle(false);
    const [showSearch, setShowSearch] = useToggle(false);

    const { username, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useDebounce(
        () => {
            if (!search) {
                setTests([]);
                setUsers([]);
                return;
            }

            const sendReq = async () => {
                const query = {
                    query: `query{search(search:"${search}"){users{_id username firstName lastName} tests{_id title} msg}}`,
                };

                try {
                    const res = await sendHTTP(query);
                    if (res.data.search) {
                        setTests(res.data.search.tests);
                        setUsers(res.data.search.users);
                    }
                } catch (err) {
                    console.log(err);
                }
            };

            sendReq();
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={setShowSearch}
                            onBlur={() => setTimeout(setShowSearch, 100)}
                        />
                        <span id="loading">Loading</span>
                    </div>
                    {
                        <ul id="search" className={showSearch ? "show" : ""}>
                            {// I actually want to display one user and one test and so on... I need a for loop for this
                            users.map((user) => (
                                <li key={user._id}>
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
                            ))}
                            {tests.map((test) => {
                                return (
                                    <li key={test._id} className="search-test">
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
                                <div className="hamburger">
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
