import Search from "./Search";
import StylistCard from "./StylistCard";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../Styles/MainPage.css";

function MainPage() {
  return (
    <div className="mainpage-full">
      <h1 className="main-title">HairHunter</h1>
      <section className="search-area">
        <InputGroup className="mb-3">
          <Form.Control type="text" placeholder="Search stylists or services" />
          <Button className="main-button">Search</Button>
        </InputGroup>
        <Dropdown>
          <Dropdown.Toggle className="main-button" id="dropdown-basic">Distance</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>No Limit</Dropdown.Item>
            <Dropdown.Item>10 miles</Dropdown.Item>
            <Dropdown.Item>25 miles</Dropdown.Item>
            <Dropdown.Item>50 miles</Dropdown.Item>
            <Dropdown.Item>75 miles</Dropdown.Item>
            <Dropdown.Item>100 miles</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>
    </div>
  );
}

export default MainPage;
