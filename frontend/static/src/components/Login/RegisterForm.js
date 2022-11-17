import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function RegisterForm({ userState, setUserState }) {
  const [userReg, setUserReg] = useState({
    username: "",
    password1: "",
    password2: "",
    is_stylist: false,
    is_client: false,
  });

  const [userType, setUserType] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "stylist") {
      setUserReg({
        ...userReg,
        is_stylist: true,
        is_client: false,
      });
    } else if (userType === "client") {
      setUserReg({
        ...userReg,
        is_stylist: false,
        is_client: true,
      });
    }
  }, [userType]);

  const checkEqualPass = (e) => {
    e.preventDefault();
    if (userReg.password1 !== userReg.password2) {
      alert("Your passwords do not match.");
      return;
    } else {
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserReg((prevUserReg) => ({
      ...prevUserReg,
      [name]: value,
    }));
  };

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
      body: JSON.stringify(userReg),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      setUserState({
        ...userState,
        auth: true,
        admin: data.is_superuser,
        userID: data.id,
        is_stylist: data.is_stylist,
        is_client: data.is_client,
        stylist_avatar: data.stylist_avatar,
        client_avatar: data.client_avatar,
        stylist_profile: data.stylist_profile,
      });
      if (userType === "stylist") {
        navigate("/create-stylist-profile");
      } else if (userType === "client") {
        navigate("/create-client-profile");
      }
    }
  };

  return (
    <div className="client-register-form log-reg-page">
      <Form onSubmit={checkEqualPass}>
        <h1 className="login-title">Register</h1>
        <Form.Group className="mb-3" controlId="usernameReg">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="input"
            type="text"
            placeholder="Enter username"
            value={userReg.username}
            onChange={handleInput}
            required
            name="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password"
            value={userReg.password1}
            onChange={handleInput}
            required
            name="password1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password2">
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password again"
            value={userReg.password2}
            onChange={handleInput}
            required
            name="password2"
          />
        </Form.Group>
        <p>Would you like to register as a Stylist or a Client?</p>
        <Form.Group className="mb-3" controlId="is-stylist">
          <Form.Check
            required
            type="radio"
            name="user-type"
            value="stylist"
            label="Stylist"
            onChange={(e) => setUserType(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="is-client">
          <Form.Check
            required
            type="radio"
            name="user-type"
            value="client"
            label="Client"
            onChange={(e) => setUserType(e.target.value)}
          />
        </Form.Group>
        <Button className="submit" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegisterForm;
