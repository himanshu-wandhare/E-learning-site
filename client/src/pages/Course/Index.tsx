import { useEffect, useState } from "react";
import CourseList, { CourseProp } from "../../components/CourseList";
import axiosClient from "../../apis/axiosClient";

export default function Courses() {
  const [courses, setCourses] = useState<CourseProp[]>([]);
  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const { data } = await axiosClient.get("/courses");
      console.log(data);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  return <CourseList courses={courses} />;
}
