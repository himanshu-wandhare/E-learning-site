import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/auth/Login";
import MyCourses from "./pages/MyCourses";
import Header from "./components/Header";
import Courses from "./pages/Course/Index";
import SignUp from "./features/auth/SignUp";
import CourseView from "./pages/Course/View";
import CourseCreate from "./pages/Course/Create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/create-course" element={<CourseCreate />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseView />} />
          <Route path="/my-courses" element={<MyCourses />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
