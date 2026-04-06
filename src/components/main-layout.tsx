import { Outlet } from "react-router-dom";
import Navbar from "./navabar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
    return (
        <div className="flex h-screen ">
            <Sidebar />
            <div className=" flex flex-col flex-1">
                <Navbar />
                <main className=" flex-1 overflow-y-auto p-4 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}