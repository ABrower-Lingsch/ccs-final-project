import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate, Navigate } from "react-router-dom";

function NavBar({ superState, logoutUser }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      <Navbar className="nav">
        <Container>
          <div>
            <Navbar.Brand href="#home" className="title">
              HairHunter
            </Navbar.Brand>
            <Navbar.Brand className="subtitle">
              Find the right stylist for you
            </Navbar.Brand>
          </div>
          <Nav className="links">
            {!superState.auth && (
              <>
                <Nav.Link href="/login"></Nav.Link>
              </>
            )}
            {superState.auth && (
              <>
                <Nav.Link href="/" onClick={(e) => logout(e)}></Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
