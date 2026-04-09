import { useState } from "react";
import { useAuthStore } from "../store/auth-store";

export default function InviteModal({ onClose }: { onClose: () => void }) {
    const inviteUser = useAuthStore(s => s.inviteUser);

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("member");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleInvite = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await inviteUser(email, role);
            setMessage("Invitation sent ✅");
            setEmail("");
        } catch (err: any) {
            setError(err.message || "Failed to invite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-80 space-y-4">
                <h2 className="text-lg font-semibold">Invite User</h2>

                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <select
                    className="w-full border p-2 rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleInvite}
                        disabled={loading}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        {loading ? "Sending..." : "Send Invite"}
                    </button>
                </div>
            </div>
        </div>
    );
}