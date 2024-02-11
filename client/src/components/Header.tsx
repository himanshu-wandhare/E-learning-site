import { useActions, useAppSelector } from "../app/hook";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  const { user } = useAppSelector((state) => state.user);
  const { logout } = useActions();

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="fw-bold" href="/">
          {!user ? "Konoha Academy" : "Hello " + user.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/courses">Courses</Nav.Link>
            {!user ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/my-courses">My Courses</Nav.Link>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
