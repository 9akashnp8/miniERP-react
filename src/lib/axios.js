import axios from "axios";

import { getCookie } from "./utils";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.request.use(function (config) {
    // attach Token before request
    // redirect to login if token now found
    const accessToken = getCookie("access");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config;
  }, function (error) {
    console.log("Something went wrong!", error)
    return Promise.reject(error);
  }
);

api.interceptors.response.use(function (config) {
    return config;
  }, async function (error) {
    // refresh the access token
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie("refresh");
        if (refreshToken) {
            return api
                .post('/token/refresh/', { refresh: refreshToken })
                .then((response) => {
                    document.cookie =  `access=${response.data.access}; path=/;`;
                    api.defaults.headers['Authorization'] =
                        'JWT ' + response.data.access;
                    originalRequest.headers['Authorization'] =
                        'JWT ' + response.data.access;
                    return api(originalRequest);
                })
                .catch((err) => {
                    console.log(`Error when refreshing token: ${err}`);
                });
        } else {
            window.location.href = "login";
        }
        
    }
    return Promise.reject(error);
  }
);

export default api;