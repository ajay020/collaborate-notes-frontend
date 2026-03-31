import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/auth-store';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const token = useAuthStore((s) => s.token);

    useEffect(() => {
        if (token) {
            // Connect only if we have a token
            const newSocket = io("http://localhost:5000", {
                auth: { token }
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        } else {
            // Disconnect if user logs out
            socket?.close();
            setSocket(null);
        }
    }, [token]);

    return (
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    )
};

// Custom hook to use the socket anywhere
export const useSocket = () => useContext(SocketContext);