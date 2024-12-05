import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Nav.css"; // Custom CSS for additional styling

const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="mb-4 navbar-custom fixed-top">
            <Navbar.Brand to="#" className="brand-text">
                <strong>
                    <i id="brand">quiZ</i>
                </strong>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggleBar" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="nav-link">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/general" className="nav-link">
                        General Knowledge
                    </Nav.Link>
                    <Nav.Link as={Link} to="/sport" className="nav-link">
                        Sport
                    </Nav.Link>
                    <Nav.Link as={Link} to="/nature" className="nav-link">
                        Nature
                    </Nav.Link>
                    <Nav.Link as={Link} to="/historical" className="nav-link">
                        Historical
                    </Nav.Link>
                    <Nav.Link as={Link} to="/constitutional" className="nav-link">
                        Constitutional
                    </Nav.Link>
                    <Nav.Link as={Link} to="/funFact" className="nav-link">
                        Fun Facts
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;