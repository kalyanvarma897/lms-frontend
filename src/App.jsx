// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';

import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';

import AdminDashboard from './pages/Admin/AdminDashboard';
import AddInstructor from './pages/Admin/AddInstructor';
import ViewInstructors from './pages/Admin/ViewInstructors';
import ViewStudents from './pages/Admin/ViewStudents';

import StudentDashboard from "./pages/Student/StudentDashboard";
import MyCourses from "./pages/Student/MyCourses";
import AvailableCourses from "./pages/Student/AvailableCourses";
import Profile from './pages/Profile';

import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import InstructorMyCourses from './pages/Instructor/InstructorCourses';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/courses" element={<CourseList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/auth/login" element={<Login />} />


        {/* ✅ Admin Dashboard with nested routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div><h2>Welcome to Admin Dashboard</h2></div>} />
          <Route path="add-instructor" element={<AddInstructor />} />
          <Route path="view-instructors" element={<ViewInstructors />} />
          <Route path="view-students" element={<ViewStudents />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="/admin/add-student" element={<Signup isAdmin={true} />} />
          <Route path="/admin/view-course" element={<CourseList isAdmin={true}/>} />
          <Route path="profile" element={<Profile />} />

        </Route>
        {/* ✅ Student Dashboard with nested routes */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<div><h2>Welcome to Student Dashboard</h2></div>} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="available-courses" element={<AvailableCourses />} />
          <Route path="profile" element={<Profile />} />

        </Route>

        {/* ✅ Instructor Dashboard with nested routes */}
        <Route path="/instructor" element={<InstructorDashboard />}>
          <Route index element={<div><h2>Welcome to Instructor Dashboard</h2></div>} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<InstructorMyCourses />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
