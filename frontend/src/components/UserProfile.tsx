import { useEffect } from "react";
import { useZustandStore } from "./zustandStore/ZustandStore"
import { useNavigate, useParams } from 'react-router-dom'


export default function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logOutUser, getCurrUser, currUser } = useZustandStore();

    function handleLogOut() {
        logOutUser();
        navigate("/login");
    }

    useEffect(() => {
        getCurrUser(id)
    }, [getCurrUser, id]);

    return (
        <div>
            <h1 className="text-3xl">Welcome {currUser.username}</h1>
            <button
                type="button"
                onClick={handleLogOut}
                className="px-4 py-1 ring ring-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all">
                Log out
            </button>
        </div>
    )
}
