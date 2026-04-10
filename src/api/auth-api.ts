import { apiClient } from "./client";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    register: async (name: string, email: string, password: string) => {
        delay(3000)
        console.log(name, email, password)
        const res = await apiClient.post("/auth/register", {
            name,
            email,
            password,
        });
        return res.data;
    },

    login: async (email: string, password: string) => {
        delay(3000)
        const res = await apiClient.post("/auth/login", {
            email,
            password,
        });

        // console.log("Login api", res)
        return res.data;
    },

    getMe: async () => {
        delay(3000) // Simulate network delay for testing loading states
        const res = await apiClient.get("/auth/me");
        return res.data;
    },

    switchOrg: async (orgId: string) => {
        delay(3000) // Simulate network delay for testing loading states
        const res = await apiClient.post("/auth/switch-org", { orgId });
        return res.data;
    },

    inviteUser: async (email: string, role: string) => {
        const res = await apiClient.post("/auth/invite", {
            email,
            role,
        });
        return res.data;
    },

    getInvites: async () => {
        delay(3000)
        const res = await apiClient.get("/auth/invites");
        // console.log("Invites api data", res.data)
        return res.data;
    },

    acceptInvite: async (inviteId: string) => {
        delay(3000)
        const res = await apiClient.post("/auth/accept-invite", {
            inviteId
        });
        return res.data;
    }
};