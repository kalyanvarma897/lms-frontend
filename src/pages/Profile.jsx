// src/pages/Profile.jsx
import React from "react";

const Profile = () => {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "#1e40af" }}>👤 My Profile</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Status:</strong> Active</p>
    </div>
  );
};

export default Profile;
