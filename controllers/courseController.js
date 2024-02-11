import { addFile } from "../helpers/addFileHelper.js";
import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";
import User from "../models/User.js";

export const courseController = {
  async createCourse(req, res) {
    try {
      //uploading files
      await addFile(req, res);

      const { name, description } = req.body;
      const { key } = req.file;

      const course = await new Course({
        name,
        description,
        thumbnail: key,
      }).save();

      res.status(200).send({
        success: true,
        course,
        message: "Course created successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Unable to create course",
        error,
      });
    }
  },
  async getCourses(req, res) {
    try {
      const courses = await Course.find();

      res.status(200).send({
        success: true,
        message: "Courses fetched successfully",
        courses,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Unable to fetch courses",
        error,
      });
    }
  },
  async getCourse(req, res) {
    try {
      const { courseId } = req.params;

      const course = await Course.findById(courseId);

      res.status(200).send({
        success: true,
        message: "Course fetch successfully",
        course,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error while fetching course",
        error,
      });
    }
  },

  async enrollCourse(req, res) {
    try {
      const userId = req.user._id;
      const { courseId } = req.params;

      const user = await User.findById(userId);
      const course = await Course.findById(courseId, "_id");
      user.courses.push(course._id);

      await user.save();

      res.status(200).send({
        success: true,
        message: "successfully enrolled",
        user,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
      });
    }
  },

  async getEnrolledCourses(req, res) {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId);
      const courses = await Course.find({ _id: user.courses }).select(
        "-lectures"
      );

      res.status(200).send({
        success: true,
        courses: courses,
        message: "courses fetched successfullly",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: "fetched failed",
      });
    }
  },

  async getLectures(req, res) {
    try {
      const { courseId } = req.params;

      const course = await Course.findById(courseId).populate(
        "lectures",
        "title key"
      );

      res.status(200).send({
        success: true,
        message: "Lectures fetched successfully",
        course,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error while fetching lectures",
        error,
      });
    }
  },

  async getLecture(req, res) {
    try {
      const { courseId, lectureId } = req.params;

      const lecture = await Lecture.findOne({ _id: lectureId, courseId });

      res.status(200).send({
        success: true,
        lecture,
        message: "Lecture fetched successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error while fetching lecture",
        error,
      });
    }
  },

  async addLecture(req, res) {
    try {
      await addFile(req, res);

      const { courseId } = req.params;
      const { title } = req.body;
      const { key } = req.file;

      const lecture = await new Lecture({ title, key, courseId }).save();
      const course = await Course.findById(courseId);

      course.lectures.push(lecture);
      await course.save();

      res.status(200).send({
        success: true,
        message: "Lecture uploaded successfully",
        lecture,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error while adding lecture",
        error,
      });
    }
  },
};
