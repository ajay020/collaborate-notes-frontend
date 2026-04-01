import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteStore } from "../store/note-store";
import NoteCard from "../components/note-card";

export default function HomePage() {
    const navigate = useNavigate();
    const { notes, isLoading, fetchNotes, addNote, removeNote, error } = useNoteStore();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleCreate = async () => {
        const id = crypto.randomUUID();
        await addNote(id);
        navigate(`/note/${id}`);
    };

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>

    // console.log("Notes", notes)

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + New Note
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-center text-gray-500">Loading your notes...</p>
                ) : notes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed">
                        <p className="text-gray-400">No notes found. Create your first one!</p>
                    </div>
                ) : (
                    // Display the list in a Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}