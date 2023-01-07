import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ResourcesComponent from "./Resources";

describe(ResourcesComponent, () => {
    it("should display Empty if no resources are provided", () => {
        const { getByText } = render(
            <ResourcesComponent testId={Math.random()} />
        );
        const emptyDiv = getByText("Empty");
        expect(emptyDiv.textContent).toEqual("Empty");
    });

    it("should display all provided resources", () => {
        const { getAllByTestId } = render(
            <ResourcesComponent
                testId={Math.random()}
                resources="http://www.google.com http://www.youtube.com "
            />
        );
        const resources = getAllByTestId("resource");
        expect(resources.length).toEqual(2);
    });

    it("should toggle/show resources once the user clicks on resource-header", () => {
        const { getByTestId } = render(
            <ResourcesComponent testId={Math.random()} />
        );
        fireEvent.click(getByTestId("resource-header"));
        const resourceBox = getByTestId("resource-box");
        expect(resourceBox.className).toEqual("resource-box active");
    });

    it("should hide resources when user clicks twice on resource-header", () => {
        const { getByTestId } = render(
            <ResourcesComponent testId={Math.random()} />
        );
        fireEvent.click(getByTestId("resource-header"));
        fireEvent.click(getByTestId("resource-header"));
        const resourceBox = getByTestId("resource-box");
        expect(resourceBox.className).toEqual("resource-box");
    });
});
