import axios from "axios";

import { getCookie } from "./utils";
import { getFiveMinsFromNow } from "./functions";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.request.use(function (config) {
    // attach Token before request
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
        return api
            .post('/token/refresh/', {}, { withCredentials: true })
            .then((response) => {
                const accessExpiry = getFiveMinsFromNow();
                document.cookie =  `access=${accessToken}; path=/; expires=${accessExpiry.toUTCString()}`;
                api.defaults.headers['Authorization'] =
                    'Bearer ' + response.data.access;
                originalRequest.headers['Authorization'] =
                    'Bearer ' + response.data.access;
                return api(originalRequest);
            })
            .catch((err) => {
                console.log(`Error when refreshing token: ${err}`);
            });
    }
    return Promise.reject(error);
  }
);

export default api;