import Button from "react-bootstrap/Button";

const MyButton = (props) => {
  return <Button variant={props.variant}>{props.buttonText}</Button>;
};

export default MyButton;
