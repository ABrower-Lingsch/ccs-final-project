import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import defaultImage from "../../Images/default2.jpg"

const INITIAL_CLIENT_STATE = {
    avatar: null,
    first_name: "",
    last_name: "",
};


function CreateClientProfile() {

    const [state, setState] = useState(INITIAL_CLIENT_STATE);
    const [preview, setPreview] = useState(defaultImage);
    const navigate = useNavigate();

    const handleError = (err) => {
        console.warn(err);
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

    const handleInput = (e) => {
        const {name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("avatar", state.avatar);
        formData.append("first_name", state.first_name);
        formData.append("last_name", state.last_name);

        const options = {
            method: "POST",
            headers: {
              "X-CSRFToken": Cookies.get("csrftoken"),
            },
            body: formData,
          };
          const response = await fetch("/api_v1/profiles/clients/", options).catch(handleError);
          if (!response.ok) {
            throw new Error("Network response was not OK");
          } else {
            const data = await response.json();
            setState(INITIAL_CLIENT_STATE);
            navigate("/");
        }
    }


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
                    <Form.Control required type="file" name="avatar" onChange={handleImage}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="first-name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" placeholder="First Name" value={state.first_name} onChange={handleInput} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="last-name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" placeholder="Last Name" value={state.last_name} onChange={handleInput} required />
                </Form.Group>
                <Button className="form-button" type="submit">Save Profile</Button>
            </Form>
        </>
    )
}

export default CreateClientProfile;