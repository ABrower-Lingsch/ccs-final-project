import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

function NavBar({ userState, logoutUser }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser(e);
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
            {!userState.auth && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            {userState.auth && (
              <>
                <Nav.Link href="/" onClick={(e) => logout(e)}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
