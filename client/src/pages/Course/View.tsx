import axiosClient from "../../apis/axiosClient";
import { Container, Image, ListGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

export default function CourseView() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const [course, setCourse] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });
  const [lectures, setLectures] = useState<
    { _id: string; title: string; key: string }[]
  >([]);
  const [video, setVideo] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchLectures();
    if (user) CheckIfEnrolled();
    // eslint-disable-next-line
  }, [user]);

  async function CheckIfEnrolled() {
    const { data } = await axiosClient.get(`/courses/enrolled-courses`);

    const isPresent = data.courses.find(
      (c: { _id: string }) => c._id == params.id
    );
    if (isPresent) setIsEnrolled(true);
    else setIsEnrolled(false);
  }

  async function fetchCourse() {
    try {
      const { data } = await axiosClient.get(`/courses/${params.id}`);
      console.log(data);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLectures() {
    try {
      const { data } = await axiosClient.get(`/courses/${params.id}/lectures`);
      setLectures(data.course.lectures);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {isEnrolled ? (
        <video
          width="100%"
          height="600"
          src={`${import.meta.env.VITE_DISTRIBUTION_NAME}/${video}`}
          controls
          controlsList="nodownload"
        ></video>
      ) : (
        <Row className="justify-content-center">
          <Image
            className="w-25"
            src={`${import.meta.env.VITE_DISTRIBUTION_NAME}/${
              course.thumbnail
            }`}
          />
        </Row>
      )}
      <Container className="py-5">
        <div>
          <h3 className="fw-bolder">{course.name}</h3>
          <p className="fs-4">{course.description}</p>
        </div>
        <ListGroup variant="flush border" defaultActiveKey="#link0">
          {lectures.map((lecture, index) => (
            <ListGroup.Item
              variant="light"
              key={lecture._id}
              action
              onFocus={() => setVideo(lecture.key)}
              href={"#link" + index}
              onClick={() => setVideo(lecture.key)}
            >
              {lecture.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}
