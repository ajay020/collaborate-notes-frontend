import { useState } from "react";
import { useAuthStore } from "../store/auth-store";

export default function OrgSwitcher() {
    const [open, setOpen] = useState(false);

    const organizations = useAuthStore(s => s.organizations);
    const currentOrg = useAuthStore(s => s.currentOrg);
    const switchOrg = useAuthStore(s => s.switchOrganization);

    const handleSwitch = async (orgId: string) => {
        await switchOrg(orgId);
        setOpen(false);
    };

    console.log(organizations)

    return (
        <div className="relative">
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                {currentOrg?.name || "Select Org"} ▼
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute mt-2 w-48 bg-white border rounded shadow">
                    {organizations.map((org) => (
                        <div
                            key={org._id}
                            onClick={() => handleSwitch(org._id)}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${currentOrg?._id === org._id ? "bg-gray-100 font-semibold" : ""
                                }`}
                        >
                            {org.name}
                            <span className="text-xs text-gray-500 ml-2">
                                ({org.role})
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}