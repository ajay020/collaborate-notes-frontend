import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/note-store';

interface Props {
    onCancel: () => void
}

function AddTitleModal({ onCancel }: Props) {
    const [title, setTitle] = useState("")

    const navigate = useNavigate();
    const addNote = useNoteStore(s => s.addNote);

    const handleCreate = async () => {
        const id = crypto.randomUUID();
        await addNote(id, title);
        await navigate(`/note/${id}`);
        onCancel()
    }

    return (
        <div className=' absolute  flex items-center justify-center border-amber-50 w-full h-screen'>
            <div className=' flex flex-col gap-1.5 items-center 
            justify-center absolute top-20 bg-white rounded 
             z-30 w-80 h-40 border'>
                <input
                    className='p-4 border'
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    placeholder='Enter title'
                />
                <div className='flex gap-2 mt-4'>
                    <button onClick={onCancel} className='bg-red-500 px-4  py-2 text-white cursor-pointer'>
                        Cancel
                    </button>
                    <button onClick={handleCreate} className='bg-blue-500 px-4  py-2 text-white cursor-pointer'>
                        Add title
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTitleModal