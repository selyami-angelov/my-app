import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import MyButton from "../Button/MyButton.js";
import "./ButtonToolbar.css";

const SearchToolbar = () => {
  return (
    <ButtonToolbar className="justify-content-md-center tb-pd tb-fw tb-bgr">
      <Form className="d-flex">
        <Form.Control
          htmlSize="50"
          size="lg"
          type="search"
          placeholder="141123 обяви близо до теб"
          className="me-1"
          aria-label="Search"
        />
        <Form.Control
          size="lg"
          type="search"
          placeholder="Цялата страна"
          className="me-1"
          aria-label="Search"
        />
        <MyButton buttonText={"Търсене"} variant={'outline-dark'}></MyButton>
      </Form>
    </ButtonToolbar>
  );
};

export default SearchToolbar;
