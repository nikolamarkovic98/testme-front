import React from "react";

// a schema basically
export default React.createContext({
    token: null,
    userId: null,
    login: (token, userId) => {},
    logout: () => {},
    showTest: (_id) => {},
    loadTests: () => {},
});
