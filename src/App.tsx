import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home-page";
import NotePage from "./pages/note-page";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import { useAuthStore } from "./store/auth-store";
import MainLayout from "./components/main-layout";
import { SocketProvider } from "./conext/socket-context";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  console.log("ProtectedRoute render, token:", token);

  if (!token) {
    navigate("/login", { replace: true });
  }

  return children
}

function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <MainLayout><Home /></MainLayout></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/note/:noteId" element={<ProtectedRoute><NotePage /></ProtectedRoute>} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;