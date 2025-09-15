import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div
      className="d-flex flex-column bg-dark text-white vh-100"
      style={{ width: "220px", position: "fixed", top: "0", left: "0" }}
    >
      <h4 className="text-center py-3">Admin</h4>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/dashboard/orders" className="nav-link text-white">
            Orders
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/dashboard/products" className="nav-link text-white">
            Products
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/dashboard/customers" className="nav-link text-white">
            Customers
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/dashboard/reports" className="nav-link text-white">
            Reports
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
