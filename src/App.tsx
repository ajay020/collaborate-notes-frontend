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
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>} >
            <Route index element={<Home />} />
            <Route path="/note/:noteId" element={<NotePage />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </SocketProvider >
    </BrowserRouter >
  );
}

export default App;