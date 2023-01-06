import { useState } from "react";

const useToggle = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const toggleValue = (value) => {
        setValue((current) => (typeof value === "boolean" ? value : !current));
    };

    return [value, toggleValue];
};

export default useToggle;
