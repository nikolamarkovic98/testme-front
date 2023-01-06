const BASE_URL = "http://localhost:4000/graphql";

export const sendHTTP = (query, token = "") => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = "Bearer " + token;
    }

    return fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(query),
        headers,
    })
        .then((res) => res.json())
        .catch((err) => err);
};

export const sendAuthHTTP = (query, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(query),
            });
            response = await response.json();
            resolve(response);
        } catch (err) {
            reject("Server is down, please try again later");
        }
    });
};
