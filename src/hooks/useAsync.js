const { useState, useCallback, useEffect } = require("react");

const useAsync = (callback, dependencies = []) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const callbackMemoized = useCallback(() => {
        callback()
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, dependencies);

    useEffect(() => {
        callbackMemoized();
    }, [callbackMemoized]);

    return { loading, error, data, setData };
};

export default useAsync;
