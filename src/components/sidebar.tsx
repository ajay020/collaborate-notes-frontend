import { Link } from "react-router-dom"
import { useState } from "react";
import AddTitleModal from "./add-title-modal";
import InviteModal from "./invite-modal";
import OrgSwitcher from "./org-switcher";
import { Pencil, Plus, User, UserPlus } from "lucide-react";

function Sidebar() {
    const [showModal, setShowModal] = useState(false);
    const [showInvite, setShowInvite] = useState(false);

    return (
        <>
            <div className="w-60 bg-gray-100 p-4 flex flex-col gap-3 border-r">
                <OrgSwitcher />

                <button
                    onClick={() => setShowModal(!showModal)}
                    className="flex items-center rounded  px-3 bg-white-500 text-gray-700 py-2  hover:bg-gray-200"
                >
                    <Plus size={16} className="mr-2" /> Add Note
                </button>

                <button
                    onClick={() => setShowInvite(true)}
                    className=" flex items-center rounded px-3 bg-white-500 text-gray-700 py-2  hover:bg-gray-200"
                >
                    <UserPlus size={16} className="mr-2" /> Invite User
                </button>

                <Link to="/" className="flex items-center rounded px-3 text-gray-700 py-2 hover:text-black hover:bg-gray-200">
                    <Pencil size={16} className="mr-2" /> Notes
                </Link>

                <Link to="/invites" className="flex items-center rounded px-3 text-gray-700 py-2 hover:text-black hover:bg-gray-200">
                    <User size={16} className="mr-2" /> Invitations
                </Link>
            </div>

            {showModal && <AddTitleModal onCancel={() => setShowModal(false)} />}
            {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
        </>
    );
}

export default Sidebar