import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = useAuthStore((s) => s.register);
    const isLoading = useAuthStore((s) => s.isLoading);

    const handleRegister = async () => {
        await register(email, password);
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister} disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}