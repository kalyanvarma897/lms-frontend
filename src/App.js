import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/add-course" element={<AddCourse />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
