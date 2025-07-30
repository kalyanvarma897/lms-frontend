import React from "react";
import {  Outlet } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";

const AdminDashboard = () => {

 


  return (
    <div>
      <AdminMenu />
      <main style={{ padding: "30px" }}>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
