import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [noteId, setNoteId] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!noteId.trim()) return;
        navigate(`/note/${noteId}`);
    };

    const handleCreate = () => {
        const id = crypto.randomUUID();
        navigate(`/note/${id}`);
    };

    return (
        <div className="flex justify-center mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
                <h2 className="text-xl font-semibold mb-2">Start collaborating</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Create a new note or join an existing one
                </p>

                <input
                    value={noteId}
                    onChange={(e) => setNoteId(e.target.value)}
                    placeholder="Enter note ID"
                    className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleJoin}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 hover:bg-blue-600"
                >
                    Join Note
                </button>

                <button
                    onClick={handleCreate}
                    className="w-full border py-2 rounded-lg hover:bg-gray-100"
                >
                    Create New Note
                </button>
            </div>
        </div>
    );
}