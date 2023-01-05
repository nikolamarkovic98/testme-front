import React from "react";

const Answer = (props) => {
    if (!props.editMode) {
        return (
            <select
                id={`${props.id}-answer`}
                defaultValue={props.answer}
                onChange={(e) => props.editAnswer(e.target.value)}
            >
                <option value="A" disabled>
                    A
                </option>
                <option value="B" disabled>
                    B
                </option>
                <option value="C" disabled>
                    C
                </option>
                <option value="D" disabled>
                    D
                </option>
            </select>
        );
    }
    return (
        <select
            id={`${props.id}-answer`}
            defaultValue={props.answer}
            onChange={(e) => props.editAnswer(e.target.value)}
        >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>
    );
};

export default Answer;
