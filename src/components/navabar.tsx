import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import OrgSwitcher from "./org-switcher";

export default function Navbar() {
    const navigate = useNavigate()
    const logout = useAuthStore(s => s.logout);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true })
    }

    return (
        <div className="bg-white-100 border-b px-6 py-3 flex justify-between items-center">
            <h1 className="font-semibold text-lg">Notes</h1>
            <OrgSwitcher />

            <button
                onClick={handleLogout}
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-600"
            >
                Logout
            </button>
        </div>
    );
}