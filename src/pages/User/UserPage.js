import "./index.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Tabs, Tab } from "../../components/Tabs/Tabs";
import TestList from "../../components/TestList";
import PassedTestList from "../../components/PassedTestList";
import { sendHTTP } from "../../requests";

const UserPage = () => {
    const [user, setUser] = useState(null);
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
                            <Tabs defaultActiveKey="created-tests">
                                <Tab
                                    activeKey="created-tests"
                                    title="Created Tests"
                                >
                                    <TestList
                                        tests={user.createdTests}
                                        num_of_passedTests={
                                            user.passedTests.length || 0
                                        }
                                    />
                                </Tab>
                                <Tab
                                    activeKey="passed-tests"
                                    title="Passed Tests"
                                >
                                    <PassedTestList
                                        passedTests={user.passedTests}
                                    />
                                </Tab>
                            </Tabs>
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
