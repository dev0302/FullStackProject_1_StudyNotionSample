import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}

// method → HTTP method (GET, POST, PUT, DELETE)
// url → API endpoint (/users, /auth/login, etc.)
// bodyData → Request body (for POST/PUT requests)
// headers → Any custom headers (like Authorization)
// params → URL query parameters (?page=1&limit=10)

// This function returns a Promise, so you can await it in your async functions.

// 1️⃣ What it does overall
// axios is a popular library for HTTP requests (GET, POST, PUT, DELETE, etc.).
// The code creates a centralized API connector so you don’t repeat Axios setup everywhere.
// You can call apiConnector() with just the method, URL, body, headers, and query params and it handles the rest.