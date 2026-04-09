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
    switchOrganization: (orgId: string) => Promise<void>;
    inviteUser: (email: string, role: string) => Promise<void>;
    refreshOrganizations: () => Promise<void>;
    hydrateAuth: () => Promise<void>;
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

    switchOrganization: async (orgId) => {
        try {
            const data = await authApi.switchOrg(orgId);

            // update token
            localStorage.setItem("token", data.token);

            // reconnect socket with new org context
            connectSocket(data.token);

            set((state) => ({
                token: data.token,
                currentOrg: state.organizations.find(o => o._id === orgId) || null
            }));

        } catch (err) {
            console.error("Switch org failed", err);
            throw err;
        }
    },

    inviteUser: async (email: string, role: string) => {
        return await authApi.inviteUser(email, role);
    },

    refreshOrganizations: async () => {
        const data = await authApi.getMe();

        set({
            organizations: data.organizations,
            currentOrg: data.organizations[0] || null
        });
    },

    hydrateAuth: async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const data = await authApi.getMe();

            set({
                token,
                organizations: data.organizations,
                currentOrg: data.organizations[0] || null
            });

            connectSocket(token);

        } catch (err) {
            console.error("Hydration failed", err);
            localStorage.removeItem("token");
        }
    }
}));