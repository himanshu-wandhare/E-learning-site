import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/api";
import { FormHandler, InputHandler } from "../../types";

export default function SignUp() {
  const navigate = useNavigate();
  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const [inputValues, setInputValues] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = React.useState("");

  const [match, setMatch] = React.useState(true);
  const [validated, setValidated] = React.useState(false);

  React.useEffect(() => {
    if (isSuccess) navigate("/login");
  });

  const handleSubmit: FormHandler = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity()) {
      if (confirmPass === inputValues.password) {
        setMatch(true);
        await register(inputValues);
      } else {
        setMatch(false);
      }
    }
    setValidated(true);
  };

  const handleInput: InputHandler = (e) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="card p-5 mt-5 mx-auto"
        style={{ width: "400px" }}
      >
        <h3 className="m-auto mb-4">Konoha Academy</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="name"
            required
            placeholder="Enter Your Name"
            onChange={handleInput}
            value={inputValues.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            required
            type="email"
            placeholder="Enter Email"
            onChange={handleInput}
            value={inputValues.email}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMobile">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            name="mobile"
            required
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Enter Mobile Number"
            onChange={handleInput}
            value={inputValues.mobile}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid mobile number.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            required
            type="password"
            placeholder="Enter Password"
            onChange={handleInput}
            value={inputValues.password}
          />
          <Form.Control.Feedback type="invalid">
            Please enter password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            required
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
          />
          <Form.Control.Feedback type="invalid">
            Please confirm password.
          </Form.Control.Feedback>
          {!match && (
            <Form.Control.Feedback className="text-danger">
              Password does not match.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoading ? <Spinner animation="border" /> : "Sign Up"}
        </Button>
      </Form>
    </>
  );
}
