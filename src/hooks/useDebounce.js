import { useEffect } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (callback, delay, dependecies = []) => {
    const { reset, clear } = useTimeout(callback, delay);
    useEffect(reset, [...dependecies, reset]);
    useEffect(clear, []);
};

export default useDebounce;
