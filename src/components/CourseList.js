import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./CourseList.css"; // Optional: for styling

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // ✅ backend endpoint
        console.log("Courses fetched:", response.data); // ✅ debug log
        setCourses(response.data); // ✅ update state
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <small>
                <strong>Instructor:</strong> {course.instructorName}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
