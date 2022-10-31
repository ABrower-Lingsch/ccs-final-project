import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import UserLogin from "./components/Login/UserLogin";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { MdAccountCircle } from "react-icons/md";

function App() {
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));
  const [user, setUser] = useState("");

  const handleError = (err) => {
    console.warn(err);
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      Cookies.remove("Authorization");
      setAuth(false);
    }
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
            <Nav.Link className="username">
              <MdAccountCircle className="user-icon" />
              {user}
            </Nav.Link>
            <Nav.Link className="logout" onClick={logoutUser}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <section className="app">
        <div className="main">
          <UserLogin setAuth={setAuth} setUser={setUser} />
        </div>
      </section>
    </>
  );
}

export default App;
