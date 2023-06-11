import { Link, useNavigate } from "react-router-dom";
import { useZustandStore } from "../zustandStore/ZustandStore";

export default function Navbar() {
    const navigate = useNavigate();
    const { logOutUser, authenticated } = useZustandStore();

    function handleLogOut() {
        logOutUser();
        navigate("/login");
    }
    return (
        <nav className="bg-gray-200 h-16 flex items-center">
            <div className="flex gap-5 ms-auto mr-10">
                <button className="px-3 py-1 rounded-md hover:text-indigo-500 hover:ring hover:ring-indigo-500 transition-all">
                    <Link to="/">Home</Link>
                </button>
                {authenticated &&
                    <button
                        type="button"
                        onClick={handleLogOut}
                        className="px-3 py-1 rounded-md hover:text-red-500 hover:ring hover:ring-red-500 transition-all">
                        Log out
                    </button>
                }
            </div>
        </nav>
    )
}
