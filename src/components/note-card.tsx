import { useNavigate } from "react-router-dom";
import type { Note } from "../types/note.types";
import { useNoteStore } from "../store/note-store";

type Props = {
    note: Note;
};

export default function NoteCard({ note }: Props) {
    const navigate = useNavigate();
    const { removeNote } = useNoteStore();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const confirmDelete = window.confirm("Delete this note?");
        if (!confirmDelete) return;

        await removeNote(note.noteId);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent card click

        navigate(`/note/${note.noteId}`);
    };

    return (
        <div
            onClick={() => navigate(`/note/${note.noteId}`)}
            className="bg-white p-6 rounded-xl shadow-sm border
             border-gray-100 hover:shadow-md transition cursor-pointer group relative"
        >
            {/* Top bar */}
            <div className="flex justify-between items-start mb-4">
                <div className="h-2 w-12 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-gray-400">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </span>
            </div>

            {/* Content */}
            <p className="text-gray-600 mb-6 line-clamp-3 text-sm">
                {note.content || "Empty note..."}
            </p>

            {/* Actions (hover only) */}
            <div className="absolute bottom-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                    onClick={handleEdit}
                    className="text-blue-600 text-xs
                     cursor-pointer
                     bg-blue-50 px-2 py-1 rounded hover:bg-blue-100"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="text-red-600 text-xs
                      cursor-pointer
                     bg-red-50 px-2 py-1 rounded hover:bg-red-100"
                >
                    Delete
                </button>
            </div>

            {/* Footer hint */}
            <div className=" absolute pt-4 mt-4 bottom-2 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition">
                <span className="text-blue-600 text-xs font-semibold">
                    Open Note →
                </span>
            </div>
        </div>
    );
}