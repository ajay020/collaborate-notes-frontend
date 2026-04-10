import { useState } from "react";
import AddTitleModal from "./add-title-modal";
import InviteModal from "./invite-modal";
import OrgSwitcher from "./org-switcher";
import { Menu, Pencil, Plus, User, UserPlus } from "lucide-react";
import SidebarItem from "./sidebar-item";


type SidebarProps = {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const [showModal, setShowModal] = useState(false);
    const [showInvite, setShowInvite] = useState(false);

    return (
        <>
            <div
                className={`${isCollapsed ? "w-20" : "w-60"
                    } bg-gray-100 p-4 flex flex-col gap-3 border-r transition-all duration-300`}
            >
                {/* Toggle */}
                <button
                    onClick={toggleSidebar}
                    className={`flex ${isCollapsed ? "justify-center" : "justify-end"} text-gray-500 hover:text-black`}
                >
                    <Menu size={20} />
                </button>

                {!isCollapsed && <OrgSwitcher />}

                <SidebarItem
                    icon={<Plus size={20} />}
                    label="Add Note"
                    onClick={() => setShowModal(true)}
                    isCollapsed={isCollapsed}
                />

                <SidebarItem
                    icon={<UserPlus size={20} />}
                    label="Invite User"
                    onClick={() => setShowInvite(true)}
                    isCollapsed={isCollapsed}
                />

                <SidebarItem
                    icon={<Pencil size={20} />}
                    label="Notes"
                    to="/"
                    isCollapsed={isCollapsed}
                />

                <SidebarItem
                    icon={<User size={20} />}
                    label="Invitations"
                    to="/invites"
                    isCollapsed={isCollapsed}
                />
            </div>

            {showModal && <AddTitleModal onCancel={() => setShowModal(false)} />}
            {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
        </>
    );
}

export default Sidebar