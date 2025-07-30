// src/pages/Student/MyCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

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
      setEnrolled(res.data);
    };

    fetchCourses();
    fetchEnrolled();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📗 My Enrolled Courses</h2>
      {courses
        .filter((c) => enrolled.includes(c.id))
        .map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>
              <strong>Instructor:</strong> {c.instructorName}
            </p>
          </div>
        ))}
      {enrolled.length === 0 && <p>You're not enrolled in any courses yet.</p>}
    </div>
  );
};

export default MyCourses;
