import React from "react";
import { /*useActions,*/ useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { useLoginMutation } from "../../app/api";
import { FormHandler, InputHandler } from "../../types";

export default function Login() {
  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { user } = useAppSelector((state) => state.user);
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });

  const [validated, setValidated] = React.useState(false);

  React.useEffect(() => {
    if (user) navigate("/");
  });

  const handleSubmit: FormHandler = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity()) {
      await login(inputValues);
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            required
            type="email"
            placeholder="Enter email"
            onChange={handleInput}
            value={inputValues.email}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid email.
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
        {/* @ts-expect-error error contains data*/}
        {isError && <div className="text-danger">{error.data.message}</div>}
        <Button variant="primary" type="submit">
          {isLoading ? <Spinner animation="border" /> : "Submit"}
        </Button>
      </Form>
    </>
  );
}
