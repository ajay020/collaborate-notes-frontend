import { create } from "zustand";
import { authApi } from "../api/auth-api";
import { connectSocket, disconnectSocket } from "../lib/socket";

type AuthState = {
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const data = await authApi.login(email, password);
            console.log("Login successful, received token:", data.token);

            localStorage.setItem("token", data.token);

            // connect socket here
            connectSocket(data.token);

            set({ token: data.token, isLoading: false });
        } catch (err) {
            set({ isLoading: false });
            throw err;
        }
    },

    register: async (email, password) => {
        set({ isLoading: true });

        try {
            await authApi.register(email, password);
            set({ isLoading: false });
        } catch (err) {
            set({ isLoading: false });
            throw err;
        }
    },

    logout: () => {
        localStorage.removeItem("token");

        //  disconnect socket
        disconnectSocket();

        set({ token: null });
    },
}));