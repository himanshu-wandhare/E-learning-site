import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FormHandler, InputHandler } from "../../types";

export default function Step2() {
  const [lectureData, setLectureData] = useState({
    title: "",
    videoUrl: "",
  });

  const handleInputChange: InputHandler = (e) => {
    const { name, value } = e.target;
    setLectureData({
      ...lectureData,
      [name]: value,
    });
  };

  const handleSubmit: FormHandler = (e) => {
    e.preventDefault();
    console.log("Lecture data submitted:", lectureData);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit} className="text-start">
            <Form.Group className="mb-3" controlId="formLectureTitle">
              <Form.Label>Lecture Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lecture title"
                name="title"
                value={lectureData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVideoUrl">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter video URL"
                name="videoUrl"
                value={lectureData.videoUrl}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Lecture
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
