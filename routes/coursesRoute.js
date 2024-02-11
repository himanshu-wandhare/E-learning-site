import { courseController } from "../controllers/courseController.js";
import { requiresLogIn } from "../middlewares/requiresLogIn.js";
import { Router } from "express";

const route = Router();

//All courses
route.get("/", courseController.getCourses);

//Create course
route.post("/create", courseController.createCourse);

//Get all videos of particular course
route.get("/:courseId/lectures", courseController.getLectures);

//Get sigle video of particular course
route.get("/:courseId/lectures/:lectureId", courseController.getLecture);

//Adds lecture to course
route.post("/:courseId/add-lecture", courseController.addLecture);

//Get all enrolled courses
route.get(
  "/enrolled-courses",
  requiresLogIn,
  courseController.getEnrolledCourses
);

//Get single course
route.get("/:courseId", courseController.getCourse);

//Enroll user to course
route.put("/enroll/:courseId", requiresLogIn, courseController.enrollCourse);

route.get("/test", requiresLogIn, (req, res) => {
  res.send({
    message: "This is all courses route",
  });
});

export default route;
