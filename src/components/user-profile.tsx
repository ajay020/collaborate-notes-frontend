import { useAuthStore } from "@/store/auth-store"
import { ChevronRight } from "lucide-react"

type UserProfileProps = {
    isCollapsed: boolean
}

function UserProfile({ isCollapsed }: UserProfileProps) {
    const user = useAuthStore(state => state.user)

    return (
        <div className="bg-gray-100 flex justify-around items-center 
        p-2 rounded hover:bg-gray-200 cursor-pointer">
            <div className={
                `rounded-full border border-gray-600 
                 w-8 h-8 p-4
                flex items-center justify-center transition-all duration-300`
            }>
                <p className={` font-bold text-lg `}>
                    {user?.name[0]?.toUpperCase()}
                </p>
            </div>

            {
                !isCollapsed && (<>

                    <div className=" ml-2">
                        <p className="text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <ChevronRight size={20} className="ml-auto text-gray-500" />
                </>)
            }
        </div >
    )
}

export default UserProfile