import "./index.css";
import React, { useState } from "react";

export const Tabs = ({ children, defaultActiveKey }) => {
    const [key, setKey] = useState(defaultActiveKey);

    const tabs = [],
        contents = [];
    React.Children.forEach(children, (child) => {
        const tabKey = child.props.activeKey;
        const activeClass = key === tabKey ? " active" : "";
        if (!tabKey) return;

        const tab = (
            <div
                key={tabKey}
                className={"tab-wrapper" + activeClass}
                onClick={() => setKey(tabKey)}
            >
                {child.props.title}
            </div>
        );
        const content = (
            <div key={tabKey} className={"content" + activeClass}>
                {child.props.children}
            </div>
        );

        tabs.push(tab);
        contents.push(content);
    });

    return (
        <div className="tabs">
            <div className="triggers-wrapper">{tabs}</div>
            {contents}
        </div>
    );
};

export const Tab = ({ title, activeKey }) => {
    return (
        <div className="tab">
            <div className="title">{title}</div>
        </div>
    );
};

export default Tabs;
