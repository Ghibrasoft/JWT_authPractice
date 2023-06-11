import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useZustandStore } from '../zustandStore/ZustandStore';

export default function Register() {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const { registerUser } = useZustandStore();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const newUser = Object.fromEntries(formData);
        try {
            await registerUser(newUser)
            formRef.current?.reset();
            navigate("/login");
        } catch (error) {
            console.log("Register submit", error);
        }

    }
    return (
        <div
            className="flex flex-col justify-center items-center border rounded-md px-16 py-24 gap-3 bg-gray-50">
            <h1 className="text-3xl font-medium text-indigo-500">
                Sign up
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
                    Register
                </button>
            </form >

            <div>
                <span>Already have an account?</span>
                <button
                    type='button'
                    className='text-indigo-500 ml-1 hover:underline'>
                    <Link to="/login">Log in</Link>
                </button>
            </div>
        </div>
    )
}
