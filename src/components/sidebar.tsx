import { Link, useNavigate } from "react-router-dom"
import { useNoteStore } from "../store/note-store";
import { useState } from "react";
import AddTitleModal from "./add-title-modal";


function Sidebar() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="w-60 bg-gray-100 p-4 flex flex-col gap-3 border-r">
                <button
                    onClick={() => setShowModal(!showModal)}
                    className="bg-blue-500 text-white px-3 py-2
                     rounded text-center cursor-pointer
                      hover:bg-blue-600 transition"
                >
                    Create Note
                </button>

                <Link to="/" className="text-gray-700 hover:text-black">
                    Notes
                </Link>
            </div>
            {showModal && <AddTitleModal onCancel={() => setShowModal(false)} />}
        </>
    );
}

export default Sidebar