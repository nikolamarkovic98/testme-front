const BASE_URL = "http://localhost:4000/graphql";

const sendHTTP = async (query) => {
    try {
        let response = null;
        while (!response) {
            response = await fetch(BASE_URL, {
                method: "POST",
                body: JSON.stringify(query),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const sendAuthHTTP = async (query, token) => {
    try {
        let response = null;
        while (!response) {
            response = await fetch(BASE_URL, {
                method: "POST",
                body: JSON.stringify(query),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { sendHTTP, sendAuthHTTP };
