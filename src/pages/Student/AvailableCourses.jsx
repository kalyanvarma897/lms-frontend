// src/pages/Student/AvailableCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    };

    const fetchEnrolled = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/enroll/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledCourses(res.data);
    };

    fetchCourses();
    fetchEnrolled();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    await axios.post(`/api/enroll/${courseId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("✅ Enrolled!");
    setEnrolledCourses([...enrolledCourses, courseId]);
  };

  return (
    <div>
      <h2>📘 Available Courses</h2>
      {courses
        .filter(c => !enrolledCourses.includes(c.id))
        .map(c => (
          <div key={c.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <button onClick={() => handleEnroll(c.id)}>Enroll</button>
          </div>
        ))}
    </div>
  );
};

export default AvailableCourses;
