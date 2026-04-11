import { useAuthStore } from "@/store/auth-store"
import { LogOutIcon, Trash } from "lucide-react"

function ProfileModal({ onClose }: { onClose: () => void }) {
    const logout = useAuthStore(state => state.logout)

    return (
        <div className="absolute bottom-16 left-4 w-50 bg-white border rounded shadow-lg">
            <div className="bg-white rounded-lg p-4 w-80 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Account</h2>

                <button
                    className="w-full flex items-center text-left p-2 hover:bg-gray-100 rounded"
                    onClick={() => alert("Delete user")}
                >
                    <Trash size={14} className="mr-2" /> Delete Account 
                </button>

                <button
                    className="w-full flex items-center text-left p-2 hover:bg-red-100 text-red-600 rounded mt-2"
                    onClick={logout}
                >
                    <LogOutIcon size={14} className="mr-2" /> Logout 
                </button>

                <div className=" flex justify-end">
                    <button
                        className="mt-4  px-3 py-2 text-sm text-gray-500  hover:text-black
                    border hover:border-black rounded-full"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal