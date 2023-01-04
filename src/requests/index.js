const BASE_URL = "http://localhost:4000/graphql";

export const sendHTTP = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(BASE_URL, {
                method: "POST",
                body: JSON.stringify(query),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            response = await response.json();
            resolve(response);
        } catch (err) {
            reject("Server is down, please try again later");
        }
    });
};

export const sendAuthHTTP = (query, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(BASE_URL, {
                method: "POST",
                body: JSON.stringify(query),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            response = await response.json();
            resolve(response);
        } catch (err) {
            reject("Server is down, please try again later");
        }
    });
};
