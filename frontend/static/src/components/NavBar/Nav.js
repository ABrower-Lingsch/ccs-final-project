import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Nav.css";

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
            <Navbar.Brand className="title">
              <Nav.Link className="logo" href="/">
                HairHunter
              </Nav.Link>
            </Navbar.Brand>
            {/* <Navbar.Brand className="subtitle">
              Find the right stylist for you
            </Navbar.Brand> */}
          </div>
          <Nav className="links">
            {!userState.auth && (
              <>
                <Nav.Link className="log-button" href="/login">Login</Nav.Link>
              </>
            )}
            {userState.auth && (
              <>
                <Nav.Link className="profile-button" href="/stylist/profile-page">Profile</Nav.Link>
                <Nav.Link className="log-button" href="/" onClick={(e) => logout(e)}>
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
