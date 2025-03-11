import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa"; // Import user & menu icons
import "./MyNavbar.css"; // Import custom CSS

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false); // State to toggle menu

  return (
    <Navbar expand="lg" variant="dark" fixed="top" className="custom-navbar w-100" expanded={expanded}>
      <Container>
        {/* Menu button for small screens */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
          className="border-0"
        >
          <FaBars size={24} color="white" />
        </Navbar.Toggle>

        {/* Centered Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="nav-item" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link href="#story" className="nav-item" onClick={() => setExpanded(false)}>
              Our Story
            </Nav.Link>

           
            <Nav.Link href="/events" className="nav-item" onClick={() => setExpanded(false)}>
            Events
            </Nav.Link>

            <Nav.Link href="#contact" className="nav-item" onClick={() => setExpanded(false)}>
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* User Icon at the top right */}
        <Nav className="position-absolute end-0 me-4">
          <NavDropdown title={<FaUser size={24} />} id="user-dropdown" align="end">
            <NavDropdown.Item as={Link} to="/login" onClick={() => setExpanded(false)}>
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/signup" onClick={() => setExpanded(false)}>
              Sign Up
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
