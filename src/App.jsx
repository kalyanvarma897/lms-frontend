import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import AddInstructor from './pages/AddInstructor'; // Renamed if needed
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/add-course" element={<AddCourse />} />

        {/* ✅ Admin routes with layout */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="add-instructor" element={<AddInstructor />} />
          <Route path="view-instructors" element={<div>View Instructors</div>} />
          <Route path="view-students" element={<div>View Students</div>} />
          <Route path="add-course" element={<AddCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
