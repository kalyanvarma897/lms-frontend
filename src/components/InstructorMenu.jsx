// src/components/InstructorMenu.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";

const InstructorMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav>
      {/* Top Navbar */}
      <div
        style={{
          backgroundColor: "#10b981", // emerald
          color: "#fff",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: 0 }}>👨‍🏫 LMS Instructor Panel</h2>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, Instructor</span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc2626",
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

      {/* Horizontal Menu */}
      <div
        style={{
          backgroundColor: "#f1f5f9",
          padding: "12px 0",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <NavLink label="Home" to="/instructor" />
        <NavLink label="Add Course" to="add-course" />
        <NavLink label="My Courses" to="my-courses" />
        <NavLink label="Profile" to="profile" /> {/* 🔧 fixed path here */}
      </div>
    </nav>
  );
};

// 💡 Reusable NavLink
const NavLink = ({ label, to }) => (
  <Link
    to={to}
    style={{
      color: "#064e3b",
      textDecoration: "none",
      fontWeight: "bold",
      padding: "6px 12px",
      borderRadius: "4px",
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#a7f3d0")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
  >
    {label}
  </Link>
);

export default InstructorMenu;
