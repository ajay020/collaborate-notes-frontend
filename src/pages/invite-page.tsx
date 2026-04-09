import { useEffect, useState } from "react";
import { authApi } from "../api/auth-api";

export default function InvitesPage() {
    const [invites, setInvites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvites();
    }, []);

    const fetchInvites = async () => {
        try {
            const data = await authApi.getInvites();
            setInvites(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (inviteId: string) => {
        try {
            await authApi.acceptInvite(inviteId);

            await fetchInvites();
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Invitations</h2>

            {invites.length === 0 && (
                <p className="text-gray-500">No pending invites</p>
            )}

            {invites.map((invite) => (
                <div
                    key={invite._id}
                    className="border p-3 rounded mb-2 flex justify-between items-center"
                >
                    <div>
                        <p className="font-medium">
                            {invite.organization.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            Role: {invite.role}
                        </p>
                    </div>

                    <button
                        onClick={() => handleAccept(invite._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Accept
                    </button>
                </div>
            ))}
        </div>
    );
}