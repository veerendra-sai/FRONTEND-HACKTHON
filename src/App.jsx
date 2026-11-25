import { useState } from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Sidebar from "./components/Sidebar";

function Layout({ user, logout }) {
  return (
    <div className="layout">
      <Sidebar logout={logout} user={user} />

      <main className="main">
        <header className="topbar">
          <h2>Student Report System</h2>
          <span>Academic Year 2026-27</span>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/students" element={<Students />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  function login(id, role) {
    const clean = id.trim().toUpperCase();

    const valid =
      (role === "Admin" && clean === "ADMIN001") ||
      (role === "Teacher" && /^TCH00[1-9]$|^TCH010$/.test(clean)) ||
      (role === "Student" && /^STU(00[1-9]|0[12][0-9]|030)$/.test(clean));

    if (!valid) return false;

    const account = { id: clean, role };

    localStorage.setItem("user", JSON.stringify(account));
    setUser(account);

    return true;
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return user ? (
    <Layout user={user} logout={logout} />
  ) : (
    <Login login={login} />
  );
}