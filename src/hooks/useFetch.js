import useAsync from "./useAsync";

const BASE_URL = "http://localhost:4000/graphql";

const useFetch = (query, token = "", dependencies = []) => {
    const options = {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (token) {
        options.headers.Authorization = "Bearer " + token;
    }

    return useAsync(() => {
        return fetch(BASE_URL, options)
            .then((res) => res.json())
            .catch((err) => err);
    }, dependencies);
};

export default useFetch;
