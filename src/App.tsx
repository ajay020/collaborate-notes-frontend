import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home-page";
import NotePage from "./pages/note-page";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";
import { connectSocket } from "./lib/socket";
import MainLayout from "./components/main-layout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  if (!token) {
    navigate("/login", { replace: true });
  }

  return children
}

function App() {
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      connectSocket(token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute> <MainLayout><Home /></MainLayout></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/note/:noteId" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;