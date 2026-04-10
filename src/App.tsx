import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home-page";
import NotePage from "./pages/note-page";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import { useAuthStore } from "./store/auth-store";
import MainLayout from "./components/main-layout";
import { SocketProvider } from "./conext/socket-context";
import InvitesPage from "./pages/invite-page";
import { useEffect } from "react";
import Spinner from "./components/spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((s) => s.token);
  console.log("ProtectedRoute render, token:", token);

  const isHydrated = useAuthStore(s => s.isHydrated);

  // wait for hydration
  if (!isHydrated) {
    return <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore(s => s.token);
  const isHydrated = useAuthStore(s => s.isHydrated);

  console.log("public route render, token:", token);


  if (!isHydrated) {
    return <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>;
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const hydrateAuth = useAuthStore(s => s.hydrateAuth);

  useEffect(() => {
    hydrateAuth();
    console.log("App useEffect called, hydrateAuth triggered");
  }, []);

  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>} >
            <Route index element={<Home />} />
            <Route path="/note/:noteId" element={<NotePage />} />
            <Route path="/invites" element={<InvitesPage />} />
          </Route>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </SocketProvider >
    </BrowserRouter >
  );
}

export default App;