import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MyButton from "../Button/MyButton.js";
import "./Shellbar.css";

const ShellBar = (props) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>xlO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">
            <Nav.Link>Съобщения</Nav.Link>
            <Nav.Link>Любими</Nav.Link>
            <NavDropdown title="Моят профил" id="collasible-nav-dropdown">
              <NavDropdown.Item>Обяви</NavDropdown.Item>
              <NavDropdown.Item>Съобщения</NavDropdown.Item>
              <NavDropdown.Item>Любими</NavDropdown.Item>
              <NavDropdown.Item>Настройки</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Изход</NavDropdown.Item>
            </NavDropdown>
            <MyButton buttonText={"Добави обява"} variant={'outline-light'}></MyButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ShellBar;
