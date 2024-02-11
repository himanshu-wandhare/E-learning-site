import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FormHandler, InputHandler } from "../../types";

export default function Step1() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
  });

  const handleInputChange: InputHandler = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit: FormHandler = (e) => {
    e.preventDefault();
    console.log(courseData);
  };

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={8}>
          <Form onSubmit={handleSubmit} className="text-start">
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter course description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInstructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter instructor name"
                name="instructor"
                value={courseData.instructor}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDuration">
              <Form.Label>Course Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course duration"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Course
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
