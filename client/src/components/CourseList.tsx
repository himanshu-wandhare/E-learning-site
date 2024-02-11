import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface CourseProp {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export default function CourseList({
  courses,
  enrollBtn,
}: {
  courses: CourseProp[];
  enrollBtn: boolean;
}) {
  return (
    <Container className="my-4">
      {courses.length === 0 && (
        <Row className="justify-content-center mt-5">
          <Spinner animation="grow" />
        </Row>
      )}
      {courses &&
        courses.map((course) => (
          <Link
            to={`/courses/${course._id}`}
            key={course._id}
            className="text-decoration-none text-dark"
          >
            <Container className="bg-light ps-4 pt-3 pb-2 border-bottom border-secondary">
              <Row>
                <Col>
                  <Image
                    src={`${import.meta.env.VITE_DISTRIBUTION_NAME}/${
                      course.thumbnail
                    }`}
                    fluid
                    style={{ width: "200px" }}
                  />
                </Col>
                <Col xs={9} className="position-relative">
                  <div className="ms-2 me-auto">
                    <h5 className="fw-bold text-dark">{course.name}</h5>
                    {course.description}
                  </div>
                  <div className="position-absolute text-end bottom-0 end-0 mb-1 me-4">
                    {enrollBtn && (
                      <Button className="px-5" variant="dark">
                        Enroll
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </Link>
        ))}
    </Container>
  );
}

CourseList.defaultProps = {
  enrollBtn: true,
};
