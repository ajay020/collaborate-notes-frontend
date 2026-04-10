import { useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { ChevronDown } from "lucide-react";

export default function OrgSwitcher() {
    const [open, setOpen] = useState(false);

    const organizations = useAuthStore(s => s.organizations);
    const currentOrg = useAuthStore(s => s.currentOrg);
    const switchOrg = useAuthStore(s => s.switchOrganization);

    const handleSwitch = async (orgId: string) => {
        await switchOrg(orgId);
        setOpen(false);
    };

    return (
        <div className="relative  bg-yellow-200">
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className=" w-full flex items-center justify-between px-3  py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
                {currentOrg?.name || "Select Org"} <ChevronDown size={16} className="ml-2" />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute mt-2 w-48 bg-white border rounded shadow">
                    {organizations.map((org) => (
                        <div
                            key={org._id}
                            onClick={() => handleSwitch(org._id)}
                            className={`px-3 py-3 
                                cursor-pointer
                                flex items-center
                                 hover:bg-gray-100 ${currentOrg?._id === org._id ? "bg-gray-100 " : ""
                                }`}
                        >
                            <p className="text-sm">{org.name}</p>
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