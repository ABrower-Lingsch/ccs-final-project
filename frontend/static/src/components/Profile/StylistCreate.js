import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import defaultImage from "../../Images/default2.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const INITIAL_STYLIST_STATE = {
  avatar: null,
  first_name: "",
  last_name: "",
  license: "",
  contact: "",
  business: "",
  location: "",
  specialties: "",
  bio: "",
  email: "",
  instagram: "",
  facebook: "",
};

function CreateStylistProfile({ userState, setUserState }) {
  const [state, setState] = useState(INITIAL_STYLIST_STATE);
  const [preview, setPreview] = useState(defaultImage);
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

    formData.append("avatar", state.avatar);
    formData.append("first_name", state.first_name);
    formData.append("last_name", state.last_name);
    formData.append("license", state.license);
    formData.append("contact", state.contact);
    formData.append("business", state.business);
    formData.append("location", state.location);
    formData.append("specialties", state.specialties);
    formData.append("bio", state.bio);
    formData.append("email", state.email);
    formData.append("instagram", state.instagram);
    formData.append("facebook", state.facebook);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/profiles/stylists/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setState(INITIAL_STYLIST_STATE);
      navigate("/");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <section>
          <h1>Create your profile</h1>
          <div className="profile-container">
            <img className="create-profile-img" src={preview} alt="" />
          </div>
        </section>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Add a profile picture</Form.Label>
          <Form.Control
            required
            type="file"
            name="avatar"
            onChange={handleImage}
          />
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
          <Form.Control
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
        <Button className="form-button" type="submit">
          Save Profile
        </Button>
      </Form>
    </>
  );
}

export default CreateStylistProfile;
