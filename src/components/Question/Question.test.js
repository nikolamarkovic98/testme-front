import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Question from "./Question";

afterEach(cleanup);

describe(Question, () => {
    test("on initial render, the select element should be disabled", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        const answerSelect = screen.getByTestId("answer");
        expect(answerSelect).toBeDisabled();
    });

    test("on initial render, the select element should have correct value", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        const answerSelect = screen.getByTestId("answer");
        expect(answerSelect.value).toEqual("C");
    });

    test("on initial render, all option inputs are correctly displayed", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        const options = screen.getAllByTestId("option");
        expect(options.length).toEqual(4);
    });

    test("on initial render, edit button is not rendered", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        expect(screen.queryByTestId("edit-btn")).toBeNull();
    });

    test("after user toggles the question, edit button is rendered", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        fireEvent.click(screen.getByTestId("content"));
        expect(screen.getByTestId("edit-btn")).toBeTruthy();
    });

    test("once the user clicks on edit, the select element should become enabled", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        fireEvent.click(screen.getByTestId("content"));
        fireEvent.click(screen.getByTestId("edit-btn"));

        const answerSelect = screen.getByTestId("answer");
        expect(answerSelect).toBeEnabled();
    });

    test("once the user clicks on edit, all option inputs should become enabled", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        fireEvent.click(screen.getByTestId("content"));
        fireEvent.click(screen.getByTestId("edit-btn"));

        const options = screen.getAllByTestId("option");
        options.forEach((option) => {
            expect(option).toBeEnabled();
        });
    });

    test("once the user clicks on edit, changes select/answer value, clicks save, the select is updated with correct value", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        fireEvent.click(screen.getByTestId("content"));

        // extend question and click edit
        const editButton = screen.getByTestId("edit-btn");
        fireEvent.click(editButton);

        // change select value
        const answerSelect = screen.getByTestId("answer");
        fireEvent.change(answerSelect, { target: { value: "A" } });

        // click save
        fireEvent.click(editButton);

        expect(answerSelect.value).toEqual("A");
    });

    test("once the user clicks on edit, changes question, clicks save, the question is updated with correct value", () => {
        render(
            <Question
                index={0}
                id={Math.random()}
                question="Is this a test?"
                A="Under A"
                B="Under B"
                C="Under C"
                D="Under D"
                answer="C"
                editQuestion={() => {}}
                removeQuestion={() => {}}
                changeOrder={() => {}}
            />
        );

        fireEvent.click(screen.getByTestId("content"));

        // extend question and click edit
        const editButton = screen.getByTestId("edit-btn");
        fireEvent.click(editButton);

        // change select value
        const question = screen.getByTestId("question");
        fireEvent.change(question, {
            target: { value: "Is this a unit or integretion test?" },
        });

        // click save
        fireEvent.click(editButton);

        expect(question.value).toEqual("Is this a unit or integretion test?");
    });
});
