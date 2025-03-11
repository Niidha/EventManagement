import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userslice";

const AdminNavbar = () => {
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
                
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admin-dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/adminusermanage">User Management</Nav.Link>
                        <Nav.Link href="/adminevent">Event Management</Nav.Link>
                        <Nav.Link href="/adminstatistics">Statistics</Nav.Link>
                    </Nav>

                
                    <div className="d-flex align-items-center">
                        <span className="text-white me-3">{username} ,Logged in</span>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
