import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { api } from "../../axios";
import "./admindashboard.css"; // Import custom styles
import AdminNavbar from "./adminnavbar";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        suspendedUsers: 0,
        activeUserList: [],
        suspendedUserList: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/admin/stats")
            .then((res) => {
                setStats(res.data || {}); // Ensure it does not set null
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch statistics");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <AdminNavbar/>
        <Container fluid className="mt-4 px-3 py-5">
            <h2 className="mb-4 text-center">System Statistics</h2>
            {loading && <Spinner animation="border" role="status" className="d-block mx-auto" />}
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            {!loading && !error && (
                <>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="table-lg text-center">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Users</td>
                                    <td>{stats.totalUsers}</td>
                                </tr>
                                <tr>
                                    <td>Active Users</td>
                                    <td>{stats.activeUsers}</td>
                                </tr>
                                <tr>
                                    <td>Suspended Users</td>
                                    <td>{stats.suspendedUsers}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <h3 className="mt-5">Active Users</h3>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="table-lg text-center">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.activeUserList?.length > 0 ? (
                                    stats.activeUserList.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="2">No active users found.</td></tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    <h3 className="mt-5">Suspended Users</h3>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="table-lg text-center">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.suspendedUserList?.length > 0 ? (
                                    stats.suspendedUserList.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="2">No suspended users found.</td></tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </>
            )}
        </Container>
        
        </div>
    );
};

export default AdminDashboard;
