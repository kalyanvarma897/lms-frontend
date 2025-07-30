// src/pages/Instructor/InstructorDashboard.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import InstructorMenu from "../../components/InstructorMenu";

const InstructorDashboard = () => {
  const location = useLocation();
  const isHome = location.pathname === "/instructor";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <InstructorMenu />
      <main style={{ flex: 1, padding: "30px 20px", backgroundColor: "#f9fafb" }}>
        {isHome ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "2rem", color: "#047857" }}>👨‍🏫 Instructor Panel</h2>
            <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
              Welcome to your teaching dashboard!
            </p>
            <p style={{ color: "#555" }}>Manage your courses and track student progress.</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default InstructorDashboard;
