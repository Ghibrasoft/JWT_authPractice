import { useEffect } from "react";
import { useZustandStore } from "../zustandStore/ZustandStore"
import { useParams } from 'react-router-dom'


export default function UserProfile() {
    const { id } = useParams();
    const { getCurrUser, currUser } = useZustandStore();

    useEffect(() => {
        getCurrUser(id)
    }, [getCurrUser, id]);

    return (
        <div>
            <h1 className="text-3xl">
                Welcome
                <span className="ml-2 px-3 py-1 rounded-md bg-indigo-500 text-white">
                    {currUser.username}
                </span>
            </h1>
        </div>
    )
}
