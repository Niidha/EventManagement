import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "./eventdetail.css";
import { api } from "../axios";
import AdminNavbar from "./Admin/adminnavbar";
import UserNavbar from "./User/usernavbar";
import MyNavbar from "./Layouts/NavBar";

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const { token, role } = useSelector((state) => state.user);
    const isAuthorized = role === "admin" || role === "user";

    useEffect(() => {
        api.get(`/${eventId}`)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error("Error fetching event details:", err));
    }, [eventId]);

    const handleEdit = () => navigate(`/edit/${eventId}`);

    const handleDelete = async () => {
        try {
            await api.delete(`/delete/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Event deleted successfully!");
            navigate("/events");
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event.");
        }
        setShowConfirm(false);
    };

    if (!event) return <p className="loading">Loading...</p>;

    return (
        <>
            {!role ? (
                <MyNavbar />
            ) : role === "admin" ? (
                <AdminNavbar />
            ) : (
                <UserNavbar />
            )}

            <Container className="event-details mt-5 pt-5">
                {isAuthorized && (
                    <div className="event-actions d-flex gap-3">
                        <Button variant="primary" onClick={handleEdit} className="edit-btn">
                            ✏️ Edit
                        </Button>
                        <Button variant="danger" onClick={() => setShowConfirm(true)} className="delete-btn">
                            🗑️ Delete
                        </Button>
                    </div>
                )}

                <h2 className="event-title">{event.title}</h2>
                <p className="event-meta">
                    📅 {new Date(event.date).toDateString()} | 📍 {event.location}
                </p>
                <img src={event.image} alt={event.title} className="event-main-img" />

                <h3 className="subtitles-title">Event Highlights</h3>
                {event.subtitles.map((subtitle, index) => (
                    <Row className="subtitle-section" key={index}>
                        <Col md={6} className="subtitle-text">
                            <h4>{subtitle.title}</h4>
                            <p>{subtitle.content}</p>
                        </Col>
                        <Col md={6} className="subtitle-image">
                            <img src={subtitle.image} alt={subtitle.title} />
                        </Col>
                    </Row>
                ))}

                <h3 className="services-title">Event Services</h3>
                <Row>
                    {event.services.map((service, index) => (
                        <Col md={4} key={index}>
                            <Card className="service-card">
                                <Card.Img variant="top" src={service.image} className="service-img" />
                                <Card.Body>
                                    <Card.Title>{service.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                    <Modal.Body>
                        <h5 className="text-center">Are you sure you want to delete this event?</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default EventDetails;
