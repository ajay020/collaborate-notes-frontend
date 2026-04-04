import { apiClient } from "./client";

export const authApi = {
    register: async (name: string, email: string, password: string) => {
        console.log(name, email, password)
        const res = await apiClient.post("/auth/register", {
            name,
            email,
            password,
        });
        return res.data;
    },

    login: async (email: string, password: string) => {
        const res = await apiClient.post("/auth/login", {
            email,
            password,
        });

        console.log("Login api", res)
        return res.data;
    },
};