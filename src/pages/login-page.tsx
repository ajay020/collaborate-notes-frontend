import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const login = useAuthStore((s) => s.login);
    const isLoading = useAuthStore((s) => s.isLoading);

    const navigate = useNavigate();

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/");
        } catch {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Login</h2>

                {error && (
                    <div className="mb-4 rounded bg-red-100 p-2 text-center text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            type="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Are you new?{" "}
                    <Link to="/register" className="font-medium text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}