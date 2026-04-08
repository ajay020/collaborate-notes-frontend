import { create } from "zustand";
import { authApi } from "../api/auth-api";
import { connectSocket, disconnectSocket } from "../lib/socket";

type Organization = {
    _id: string;
    name: string;
    role: string;
};

type AuthState = {
    token: string | null;
    organizations: Organization[];
    currentOrg: Organization | null;
    isLoading: boolean;

    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    organizations: [],
    currentOrg: null,
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const data = await authApi.login(email, password);
            console.log("Login resonse", data)

            // ✅ Save token
            localStorage.setItem("token", data.token);

            // ✅ Save orgs
            const orgs = data.organizations;

            // ✅ Default org (first one)
            const currentOrg = orgs[0] || null;

            // connect socket
            connectSocket(data.token);

            set({
                token: data.token,
                organizations: orgs,
                currentOrg,
                isLoading: false
            });

        } catch (err) {
            set({ isLoading: false });
            throw err;
        }
    },

    register: async (name, email, password) => {
        set({ isLoading: true });

        try {
            await authApi.register(name, email, password);
            set({ isLoading: false });
        } catch (err) {
            set({ isLoading: false });
            throw err;
        }
    },

    logout: () => {
        localStorage.removeItem("token");

        disconnectSocket();

        set({
            token: null,
            organizations: [],
            currentOrg: null
        });
    },
}));