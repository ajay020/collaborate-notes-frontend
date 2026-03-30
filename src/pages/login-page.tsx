import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = useAuthStore((s) => s.login);
    const isLoading = useAuthStore((s) => s.isLoading);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate("/");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />

            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>

            <p>
                Are you new ? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}