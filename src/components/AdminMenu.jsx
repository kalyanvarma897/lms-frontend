import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout"; 

const AdminMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav>
      {/* 🔷 Top Navbar */}
      <div
        style={{
          backgroundColor: "#1e3a8a",
          color: "#fff",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: 0 }}>📚 LMS Admin Panel</h2>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, Admin</span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
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
          backgroundColor: "#f1f5f9",
          padding: "12px 0",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <NavLink label="Home" to="/admin" />
        <NavLink label="Add Instructor" to="add-instructor" />
        <NavLink label="View Instructors" to="view-instructors" />
        <NavLink label="Add Student" to="add-student" />
        <NavLink label="View Students" to="view-students" />
        <NavLink label="Add Course" to="add-course" />
        <NavLink label="View Courses" to="view-course" />
        <NavLink label="Profile" to="profile" />
      </div>
    </nav>
  );
};

const NavLink = ({ label, to }) => (
  <Link
    to={to}
    style={{
      color: "#d66113cb",
      textDecoration: "none",
      fontWeight: "bold",
      padding: "6px 12px",
      borderRadius: "4px",
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#dbeafe")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
  >
    {label}
  </Link>
);

export default AdminMenu;
