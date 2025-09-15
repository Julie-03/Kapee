import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./navBar";
import Sidebar from "./sideBar";

const Dashboard: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{ marginLeft: "220px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <AdminNavbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
