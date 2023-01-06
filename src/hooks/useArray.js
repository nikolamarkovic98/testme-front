import { useState } from "react";

export const useArray = (defaultValue = []) => {
    const [array, setArray] = useState(defaultValue);

    const push = (element) => {
        setArray((prev) => [...prev, element]);
    };

    const filter = (callback) => {
        setArray((prev) => prev.filter(callback));
    };

    const update = (index, newElement) => {
        setArray((prev) => {
            prev[index] = newElement;
            return [...prev];
        });
    };

    const remove = (index) => {
        setArray((prev) => {
            prev.splice(index, 1);
            return [...prev];
        });
    };

    const clear = () => setArray([]);

    return { array, setArray, push, filter, update, remove, clear };
};

export default useArray;
