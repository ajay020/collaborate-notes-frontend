import { useAuthStore } from "../store/auth-store";

export default function Navbar() {
    const { logout } = useAuthStore();

    return (
        <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
            <h1 className="font-semibold text-lg">Notes</h1>

            <button
                onClick={logout}
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
            >
                Logout
            </button>
        </div>
    );
}