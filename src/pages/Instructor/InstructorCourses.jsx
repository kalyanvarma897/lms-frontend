import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const InstructorMyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/courses/instructor/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching instructor courses:", error);
      }
    };

    fetchInstructorCourses();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📚 My Created Courses</h2>
      {courses.length === 0 ? (
        <p>You haven't created any courses yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses.map((course) => (
            <li
              key={course.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>
                <strong>Created on:</strong>{" "}
                {course.createdAt
                  ? new Date(course.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstructorMyCourses;
