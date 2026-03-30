import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home-page";
import NotePage from "./pages/note-page";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";
import { connectSocket } from "./lib/socket";
import MainLayout from "./components/main-layout";

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
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/note/:noteId" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;