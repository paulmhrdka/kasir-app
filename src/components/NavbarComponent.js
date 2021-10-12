import React from "react";
import { Navbar, Container } from "react-bootstrap";

function NavbarComponent() {
  return (
    <Navbar className="navbar" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="nav-brand">
          <strong>Kasir App</strong>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
