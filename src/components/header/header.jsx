import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/appointment/home">Appointments</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/appointment/home">Home</Nav.Link>
                    <Nav.Link href="/appointment/book">Book</Nav.Link>
                    <Nav.Link href="#features">About Us</Nav.Link>
                    <Nav.Link href="#features">Contact Us</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}