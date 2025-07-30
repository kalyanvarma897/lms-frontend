// src/pages/StudentDashboard.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentMenu from "../../components/StudentMenu";

const StudentDashboard = () => {
  const location = useLocation();
  const isHome = location.pathname === "/student";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StudentMenu />
      <main
        style={{
          flex: 1,
          padding: "30px 20px",
          backgroundColor: "#f9fafb", // Tailwind lightest gray
        }}
      >
        {isHome ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#e0f2fe", // Tailwind light-blue-100
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2 style={{ fontSize: "2rem", color: "#1e3a8a" }}>🎓 Student Panel</h2>
            <p style={{ fontSize: "1.2rem", marginTop: "10px", color: "#1f2937" }}>
              Welcome to your dashboard, Student 👋
            </p>
            <p style={{ color: "#374151" }}>
              Explore courses and track your progress efficiently.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
