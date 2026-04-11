import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <div className="bg-white-100 border-b px-6 py-3 flex justify-between items-center">
            <Link to={"/"}>
                <div className="flex items-center gap-4">
                    <Edit />
                    <h1 className="font-semibold text-lg">Notes</h1>
                </div>
            </Link>

        </div>
    );
}