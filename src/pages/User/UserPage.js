import "./index.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TestList from "../../components/TestList";
import PassedTestList from "../../components/PassedTestList";
import { sendHTTP } from "../../requests";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("created");
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const query = {
                query: `query{user(username:"${id}"){
                    _id firstName lastName username password msg
                    createdTests{_id title desc resources creator{username createdTests{ _id }} createdAt} 
                    passedTests{_id title grade resources score minutes seconds creator{username createdTests{_id}} createdAt}
                }}`,
            };

            try {
                const res = await sendHTTP(query);
                if (res.data.user) {
                    if (res.data.user.msg !== "User does not exist") {
                        setUser(res.data.user);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <div className="user">
            <div className="content-wrap">
                {user ? (
                    <>
                        <h1>{`${user.firstName} ${user.lastName}`}</h1>
                        <div className="tests">
                            <nav>
                                <div
                                    className={
                                        tab === "created" ? "active" : ""
                                    }
                                    onClick={() => setTab("created")}
                                >
                                    Created tests
                                </div>
                                <div
                                    className={tab === "passed" ? "active" : ""}
                                    onClick={() => setTab("passed")}
                                >
                                    Passed tests
                                </div>
                            </nav>
                            <section
                                className={tab === "created" ? "active" : ""}
                            >
                                <TestList
                                    tests={user.createdTests}
                                    num_of_passedTests={
                                        user.passedTests.length || 0
                                    }
                                />
                            </section>
                            <section
                                className={tab === "passed" ? "active" : ""}
                            >
                                <PassedTestList
                                    passedTests={user.passedTests}
                                />
                            </section>
                        </div>
                    </>
                ) : (
                    <h1>404 - User doesnt exist</h1>
                )}
            </div>
        </div>
    );
};

export default UserPage;
