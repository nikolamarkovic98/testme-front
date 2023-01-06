import "./index.css";
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import { Tabs, Tab } from "../../components/Tabs/Tabs";
import TestList from "../../components/TestList";
import PassedTestList from "../../components/PassedTestList";

const UserPage = () => {
    const { id } = useParams();
    const { loading, data } = useFetch(
        {
            query: `query{user(username:"${id}"){
            _id firstName lastName username password msg
            createdTests{_id title desc resources creator{username createdTests{ _id } passedTests{ _id }} createdAt} 
            passedTests{_id title grade resources score minutes seconds creator{username createdTests{_id}} createdAt}
        }}`,
        },
        "",
        [id]
    );

    if (loading) return null;

    const { user } = data.data;

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
                                    <TestList tests={user.createdTests} />
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
