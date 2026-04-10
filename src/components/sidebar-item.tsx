import { Link } from "react-router-dom";

type Props = {
    icon: React.ReactNode;
    label: string;
    to?: string;
    onClick?: () => void;
    isCollapsed: boolean;
};

export default function SidebarItem({
    icon,
    label,
    to,
    onClick,
    isCollapsed,
}: Props) {
    const baseClass =
        "flex items-center rounded py-2 text-gray-700 hover:bg-gray-200 transition";

    const layoutClass = isCollapsed
        ? "justify-center px-0"
        : "px-3";

    const content = (
        <>
            {icon}
            {!isCollapsed && <span className="ml-2">{label}</span>}
        </>
    );

    if (to) {
        return (
            <Link to={to} title={label} className={`${baseClass} ${layoutClass}`}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            title={label}
            className={`${baseClass} ${layoutClass}`}
        >
            {content}
        </button>
    );
}