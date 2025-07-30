// src/components/StudentMenu.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/logout";

const StudentMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav>
      {/* 🔷 Top Navbar */}
      <div
        style={{
          backgroundColor: "#2563eb", // Blue-600
          color: "#fff",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: 0 }}>🎓 LMS Student Panel</h2>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, Student 👋</span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc2626", // Red-600
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔵 Horizontal Menu */}
      <div
        style={{
          backgroundColor: "#f1f5f9", // Light gray
          padding: "12px 0",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <NavLink label="Home" to="/student" currentPath={location.pathname} />
        <NavLink label="My Courses" to="my-courses" currentPath={location.pathname} />
        <NavLink label="Available Courses" to="available-courses" currentPath={location.pathname} />
        <NavLink label="Profile" to="profile" currentPath={location.pathname} />
      </div>
    </nav>
  );
};

// 🧩 Reusable NavLink Component
const NavLink = ({ label, to, currentPath }) => {
  const isActive =
    currentPath === to || currentPath === `/student/${to}`;

  return (
    <Link
      to={to}
      style={{
        color: isActive ? "#1e3a8a" : "#1e40af", // darker blue if active
        backgroundColor: isActive ? "#dbeafe" : "transparent",
        textDecoration: "none",
        fontWeight: "bold",
        padding: "6px 12px",
        borderRadius: "4px",
      }}
    >
      {label}
    </Link>
  );
};

export default StudentMenu;
