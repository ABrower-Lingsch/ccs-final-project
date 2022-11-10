import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function StylistEdit({ userState, setUserState, profilePage, setProfilePage }) {
  const [state, setState] = useState(profilePage);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState(state.avatar);

  const navigate = useNavigate();

  const handleError = (err) => {
    console.warn(err);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setState({
      ...state,
      avatar: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const user = { ...state };

    for (const key in user) {
      if (user[key]) {
        formData.append(key, user[key]);
      }
    }

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(
      `/api_v1/profiles/stylists/${state.id}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK!");
    } else {
      const data = await response.json();
      setUserState({
        ...userState,
        stylist_avatar: data.avatar,
      });
      setIsEdit(false);
      navigate("/stylist/profile-page");
    }
  };

  const previewHTML = (
    <>
      <section>
        <div className="profile-container">
          <img
            className="create-profile-img"
            src={state.avatar}
            alt="profile picture"
          />
        </div>
      </section>
      <section>
        <h1>
          {state.first_name} {state.last_name}
        </h1>
        <div>{state.business}</div>
        <div>{state.location}</div>
        <div>{state.contact}</div>
        <div>{state.email}</div>
        <ul>
          <li>
            <a href={state.instagram}>
              <AiFillInstagram />
            </a>
          </li>
          <li>
            <a href={state.facebook}>
              <BsFacebook />
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Specialties:</h2>
        <div>{state.specialties}</div>
        <h3>About {state.first_name}</h3>
        <div>{state.bio}</div>
      </section>
      <Button type="button" onClick={() => setIsEdit(true)}></Button>
    </>
  );

  const editHTML = (
    <>
      <Form onSubmit={handleSubmit}>
        <section>
          <h1>Edit your profile</h1>
          <div className="profile-container">
            <img className="create-profile-img" src={preview} alt="" />
          </div>
        </section>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Add a profile picture</Form.Label>
          <Form.Control type="file" name="avatar" onChange={handleImage} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="First Name"
            value={state.first_name}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={state.last_name}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="license">
          <Form.Label>License Number</Form.Label>
          <Form.Control
            type="text"
            name="license"
            placeholder="License Number"
            value={state.license}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="contact">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="contact"
            placeholder="Phone Number (Business or Personal)"
            value={state.contact}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="business">
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="text"
            name="business"
            value={state.business}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Address of Salon or Suite</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Business Address"
            value={state.location}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="specialties">
          <Form.Label>Specialties</Form.Label>
          <Form.Control
            type="text"
            name="specialties"
            placeholder="List your areas of expertise (ex. Men's Cuts, Fashion color)"
            value={state.specialties}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <textarea
            type="text"
            name="bio"
            placeholder="Any additional information, such as education and experience."
            value={state.bio}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="youremail@example.com"
            value={state.email}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="instagram">
          <Form.Label>Link your Instagram page</Form.Label>
          <Form.Control
            type="text"
            name="instagram"
            value={state.instagram}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="facebook">
          <Form.Label>Link your Facebook page</Form.Label>
          <Form.Control
            type="text"
            name="facebook"
            value={state.facebook}
            onChange={handleInput}
          />
        </Form.Group>
        <Button
          className="form-button"
          type="submit"
          onClick={() => setIsEdit(false)}
        >
          Save Profile
        </Button>
      </Form>
    </>
  );

  return <>{isEdit ? editHTML : previewHTML}</>;
}

export default StylistEdit;
