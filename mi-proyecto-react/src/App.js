import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useToken from "./useToken";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Students from "./pages/Students";


function App() {
  const { token, setToken } = useToken();

  // Si no hay token, muestro login
  if (!token) return <Login setToken={setToken} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Ruta por defecto */}
          <Route index element={<Navigate to="/profile" replace />} />

          {/* Rutas internas */}
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="students" element={<Students />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
