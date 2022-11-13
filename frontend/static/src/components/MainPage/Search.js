import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Search() {
  return (
    <section>
      <InputGroup className="mb-3">
        <Form.Control type="text" placeholder="Search..." />
      </InputGroup>
    </section>
  );
}

export default Search;
