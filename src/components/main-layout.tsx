import { Outlet } from "react-router-dom";
import Navbar from "./navabar";
import Sidebar from "./sidebar";
import { useState } from "react";

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen ">
            <Sidebar
                isCollapsed={isCollapsed}
                toggleSidebar={() => setIsCollapsed(!isCollapsed)}
            />
            <div className=" flex flex-col flex-1">
                <Navbar />
                <main className=" flex-1 overflow-y-auto p-4 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}