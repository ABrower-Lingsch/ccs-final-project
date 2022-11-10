import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ userState, setUserState }) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      console.log({ data });
      setUserState({
        ...userState,
        ...data,
        auth: true,
        admin: data.is_superuser,
        userID: data.id,
      });
      navigate("/");
    }
  };

  return (
    <div className="login-form">
      <Form onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="input"
            type="text"
            placeholder="Enter username"
            value={state.username}
            onChange={handleInput}
            required
            name="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password"
            value={state.password}
            onChange={handleInput}
            required
            name="password"
          />
        </Form.Group>
        <Button className="submit" variant="primary" type="submit">
          Login
        </Button>
        <p>
          or <Link to={"/register"}>Register</Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;
