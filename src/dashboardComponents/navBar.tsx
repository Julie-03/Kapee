import React from "react";
import { Navbar, Container } from "react-bootstrap";

const AdminNavbar: React.FC = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm"
      style={{ backgroundColor: "#f7c600" }}
    >
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="fw-bold text-dark">
          Kapee Admin
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;