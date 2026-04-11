import { useAuthStore } from "@/store/auth-store"

function ProfileModal({ onClose }: { onClose: () => void }) {
    const logout = useAuthStore(state => state.logout)

    return (
        <div className="absolute bottom-16 left-4 w-56 bg-white border rounded shadow-lg">
            <div className="bg-white rounded-lg p-4 w-80 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Account</h2>

                <button
                    className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    onClick={() => alert("Update user")}
                >
                    Update Profile
                </button>

                <button
                    className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    onClick={() => alert("Delete user")}
                >
                    Delete Account
                </button>

                <button
                    className="w-full text-left p-2 hover:bg-red-100 text-red-600 rounded mt-2"
                    onClick={logout}
                >
                    Logout
                </button>

                <button
                    className="mt-4 text-sm text-gray-500"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ProfileModal