import axios from "axios";
import type { ApiError } from "../types/api-error.types";

export const apiClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || "An unknown error occurred",
            status: error.response?.status,
            errors: error.response?.data?.errors,
        }

        console.log("API Error: ", error);
        console.log("Error Response:", error.response);
        return Promise.reject(apiError);
    }
);