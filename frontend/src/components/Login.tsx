import { useNavigate, Link } from 'react-router-dom'
import { useZustandStore } from './zustandStore/ZustandStore';
import { useEffect, useRef } from 'react';


export default function Login() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const { loginUser, authenticated } = useZustandStore();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const userData = Object.fromEntries(formData);
        try {
            await loginUser(userData)  // here I got only ID and TOKEN
            // const userId = localStorage.getItem("userId");
            // navigate(`/profile/${userId}`);
        } catch (error) {
            console.log("Login submit", error);
        }
    }

    useEffect(() => {
        if (authenticated) {
            const userId = localStorage.getItem("userId");

            if (userId) {
                navigate(`/profile/${userId}`);
            } else {
                navigate("/login");
            }
        }
    }, [authenticated])

    return (
        <div
            className="flex flex-col justify-center items-center border rounded-md px-16 py-24 gap-3 bg-gray-50">
            <h1 className="text-3xl font-medium text-indigo-500">
                Sign in
            </h1>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-3">
                <input
                    type="text"
                    name="username"
                    placeholder="Username..."
                    className="px-4 py-2 border rounded-md shadow outline-none"
                    required />
                <input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    className="px-4 py-2 border rounded-md shadow outline-none"
                    required />
                <button
                    type="submit"
                    className="px-4 py-1 ring ring-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition-all">
                    Log in
                </button>
            </form >

            <div>
                <span>Not have an account?</span>
                <button
                    type='button'
                    className='text-indigo-500 ml-1 hover:underline'>
                    <Link to="/">Register</Link>
                </button>
            </div>
        </div>
    )
}
