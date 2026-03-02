import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useToken from "../useToken";

function Layout() {
  const { user, removeToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
    window.location.reload();
  };
  return (
    <div id="root">
      <nav id="sidebar">
        <h1>🏛️ Chronos Archive</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/profile">Mi Perfil</NavLink>
            </li>

            {/* Solo Admin ve Investigadores */}
            {user?.type === "admin" && (
              <li>
                <NavLink to="/users">Investigadores</NavLink>
              </li>
            )}

            {/* Admin y Teacher ven el Archivo */}
            {(user?.type === "teacher" || user?.type === "admin") && (
              <li>
                <NavLink to="/students">Archivo Histórico</NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div style={{ marginTop: "auto", padding: "1rem" }}>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sistema
          </button>
        </div>
      </nav>

      <main id="detail">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
