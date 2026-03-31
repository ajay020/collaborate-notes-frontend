import { useEffect, useRef, useState } from "react";
import { useSocket } from "../conext/socket-context";

export function useNote(noteId: string) {
    const [content, setContent] = useState("");
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [userCount, setUserCount] = useState(0);
    const [isOwner, setIsOwner] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const socket = useSocket();

    useEffect(() => {
        // console.log("useeffect socket :", socket);
        if (!socket) return;

        socket.emit("join-note", noteId);

        const handleRole = ({ isOwner }: { isOwner: boolean }) => {
            setIsOwner(isOwner);
        };

        const handleUsers = ({ count }: { count: number }) => {
            setUserCount(count);
        };

        const handleTyping = ({ userId }: { userId: string }) => {
            setTypingUsers((prev) =>
                prev.includes(userId) ? prev : [...prev, userId]
            );

            setTimeout(() => {
                setTypingUsers((prev) => prev.filter((id) => id !== userId));
            }, 1000);
        };

        const handleLoad = (data: string) => {
            // console.log("Note loaded:", data);
            setContent(data);
        };

        const handleUpdate = ({
            content,
            senderId,
        }: {
            content: string;
            senderId: string;
        }) => {
            if (senderId === socket.id) return;
            setContent(content);
        };

        socket.on("note-role", handleRole);
        socket.on("users-update", handleUsers);
        socket.on("user-typing", handleTyping);
        socket.on("note-load", handleLoad);
        socket.on("note-update", handleUpdate);

        return () => {
            socket.off("note-role", handleRole);
            socket.off("users-update", handleUsers);
            socket.off("user-typing", handleTyping);
            socket.off("note-load", handleLoad);
            socket.off("note-update", handleUpdate);
        };
    }, [noteId, socket]);

    const handleChange = (value: string) => {
        setContent(value);

        socket?.emit("typing", noteId);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            socket?.emit("note-change", { noteId, content: value });
        }, 500);
    };

    console.log("useNote:", { content, typingUsers, userCount, isOwner });

    return {
        content,
        typingUsers,
        userCount,
        isOwner,
        handleChange,
    };
}