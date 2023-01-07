import React from "react";
import { render } from "@testing-library/react";
import UserInfoComponent from "./UserInfo";
import { BrowserRouter } from "react-router-dom";

describe(UserInfoComponent, () => {
    it("should properly display username", () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <UserInfoComponent
                    username="Nikola"
                    createdTestsLen="2"
                    passedTestsLen="2"
                />
            </BrowserRouter>
        );
        const usernameElement = getByTestId("username");
        expect(usernameElement.textContent).toEqual("Nikola");
    });

    it("should properly display number of created tests", () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <UserInfoComponent
                    username="Nikola"
                    createdTestsLen="2"
                    passedTestsLen="2"
                />
            </BrowserRouter>
        );
        const createdTestsElement = getByTestId("created-tests");
        expect(createdTestsElement.textContent).toEqual("Created tests: 2");
    });

    it("should properly display number of passed tests", () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <UserInfoComponent
                    username="Nikola"
                    createdTestsLen="2"
                    passedTestsLen="2"
                />
            </BrowserRouter>
        );
        const passedTestsElement = getByTestId("passed-tests");
        expect(passedTestsElement.textContent).toEqual("Passed tests: 2");
    });
});
