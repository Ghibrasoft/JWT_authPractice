import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className='text-3xl font-bold'>
                Welcome to home page
            </h1>

            <div className="flex gap-5">
                <button
                    type="button"
                    className="px-4 py-1 ring ring-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition-all">
                    <Link to="/register" >Sign up</Link>
                </button>
                <button
                    type="button"
                    className="px-4 py-1 ring ring-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition-all"
                >
                    <Link to="/login" >Sign in</Link>
                </button>
            </div>
        </div>
    )
}
