import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Tabs, Tab } from "./Tabs";

describe(Tabs, () => {
    it("should render correct number of tabs", () => {
        const { getAllByTestId } = render(
            <Tabs defaultActiveKey="tab-1">
                <Tab activeKey="tab-1">
                    <h1>Tab 1</h1>
                </Tab>
                <Tab activeKey="tab-2">
                    <h1>Tab 2</h1>
                </Tab>
                <Tab activeKey="tab-3">
                    <h1>Tab 3</h1>
                </Tab>
            </Tabs>
        );
        const tabs = getAllByTestId("tab-wrapper");
        expect(tabs.length).toEqual(3);
    });

    it("should render content for each tab", () => {
        const { getAllByTestId } = render(
            <Tabs defaultActiveKey="tab-1">
                <Tab activeKey="tab-1">
                    <h1>Tab 1</h1>
                </Tab>
                <Tab activeKey="tab-2">
                    <h1>Tab 2</h1>
                </Tab>
                <Tab activeKey="tab-3">
                    <h1>Tab 3</h1>
                </Tab>
            </Tabs>
        );
        const contents = getAllByTestId("content");
        expect(contents.length).toEqual(3);
    });

    it("should make correct tab active upon render", () => {
        const { getAllByTestId } = render(
            <Tabs defaultActiveKey="tab-2">
                <Tab activeKey="tab-1">
                    <h1>Tab 1</h1>
                </Tab>
                <Tab activeKey="tab-2">
                    <h1>Tab 2</h1>
                </Tab>
                <Tab activeKey="tab-3">
                    <h1>Tab 3</h1>
                </Tab>
            </Tabs>
        );
        const tabs = getAllByTestId("tab-wrapper");
        expect(tabs[1].className).toEqual("tab-wrapper active");
    });

    it("should display correct content for active tab", () => {
        const { getAllByTestId } = render(
            <Tabs defaultActiveKey="tab-2">
                <Tab activeKey="tab-1">
                    <h1>Tab 1</h1>
                </Tab>
                <Tab activeKey="tab-2">
                    <h1>Tab 2</h1>
                </Tab>
                <Tab activeKey="tab-3">
                    <h1>Tab 3</h1>
                </Tab>
            </Tabs>
        );
        const contents = getAllByTestId("content");
        expect(contents[1].className).toEqual("content active");
    });

    it("should display correct tab after user clicks on another tab", () => {
        const { getAllByTestId } = render(
            <Tabs defaultActiveKey="tab-1">
                <Tab activeKey="tab-1">
                    <h1>Tab 1</h1>
                </Tab>
                <Tab activeKey="tab-2">
                    <h1>Tab 2</h1>
                </Tab>
                <Tab activeKey="tab-3">
                    <h1>Tab 3</h1>
                </Tab>
            </Tabs>
        );
        const tabs = getAllByTestId("tab-wrapper");
        fireEvent.click(tabs[1]);
        expect(tabs[1].className).toEqual("tab-wrapper active");
    });
});
