// src/pages/AdminDashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={{ width: "200px", padding: "20px", backgroundColor: "#f0f0f0" }}>
        <h3>Admin Panel</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="add-instructor">Add Instructor</Link></li>
          <li><Link to="view-instructors">View Instructors</Link></li>
          <li><Link to="view-students">View Students</Link></li>
          <li><Link to="add-course">Add Course</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
