import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userslice";

const UserNavbar = () => {
    const navigate = useNavigate();
    const {username} = useSelector((state) => state.user);
const dispatch=useDispatch()
    const handleLogout = () => {
      dispatch(logoutUser());
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      navigate("/")
  };

    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="w-100 fixed-top">
            <Container fluid>
              
                <Navbar.Brand href="/user-dashboard">🌟 MyEvents</Navbar.Brand>

                
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/update">Update Profile</Nav.Link>
                        <Nav.Link href="/create">Create Event</Nav.Link>
                    </Nav>

                    {/* Greeting and Logout Button */}
                    <div className="d-flex align-items-center">
                        <span className="text-white me-3 font-bold">Admin {username} ,Logged in</span>
                        <Button variant="danger" className="font-bold" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserNavbar;
