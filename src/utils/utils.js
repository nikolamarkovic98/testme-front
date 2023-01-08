export const createStr = (str) => {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '"') {
            newStr += "|";
            continue;
        }
        newStr += str[i];
    }
    return newStr;
};

export const getDate = (_date) => {
    const date = new Date(_date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const getLSState = () => {
    let lsState = localStorage.getItem("testme-app");
    return lsState ? JSON.parse(lsState) : "";
};

export const isURL = (url) => {
    // if it throws error its not a valid URL
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};
