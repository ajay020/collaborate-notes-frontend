import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/note-store';

interface Props {
    onCancel: () => void
}

function AddTitleModal({ onCancel }: Props) {
    const [title, setTitle] = useState("");

    const navigate = useNavigate();
    const addNote = useNoteStore(s => s.addNote);

    const handleCreate = async () => {
        if (!title.trim()) return;

        const id = crypto.randomUUID();
        await addNote(id, title);
        navigate(`/note/${id}`);
        onCancel();
    };

    return (
        <div onClick={onCancel} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6"
            >

                <h2 className="text-lg font-semibold mb-4">
                    Create New Note
                </h2>

                <input
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreate();
                    }}
                    placeholder="Enter note title..."
                    className="w-full border rounded-md px-3 py-2 
                    outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-5">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 rounded-md bg-blue-600
                        text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={!title.trim()}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTitleModal