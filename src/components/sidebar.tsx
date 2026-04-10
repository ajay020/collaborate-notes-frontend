import { Link } from "react-router-dom"
import { useState } from "react";
import AddTitleModal from "./add-title-modal";
import InviteModal from "./invite-modal";

function Sidebar() {
    const [showModal, setShowModal] = useState(false);
    const [showInvite, setShowInvite] = useState(false);

    return (
        <>
            <div className="w-60 bg-gray-100 p-4 flex flex-col gap-3 border-r">

                <button
                    onClick={() => setShowModal(!showModal)}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                    Create Note
                </button>

                {/* NEW BUTTON */}
                <button
                    onClick={() => setShowInvite(true)}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                    Invite User
                </button>

                <Link to="/" className="text-gray-700 hover:text-black">
                    Notes
                </Link>

                <Link to="/invites" className="text-gray-700 hover:text-black">
                    Invitations
                </Link>
            </div>

            {showModal && <AddTitleModal onCancel={() => setShowModal(false)} />}
            {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
        </>
    );
}

export default Sidebar