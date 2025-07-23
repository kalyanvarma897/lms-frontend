import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingEnrolled, setLoadingEnrolled] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        console.log("Courses fetched:", response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchEnrollmentCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/enroll/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoadingEnrolled(false);
      }
    };

    fetchCourses();
    fetchEnrollmentCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`/api/enroll/${courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Enrolled successfully!");
      console.log("Enrollment response:", response.data);
      setEnrolledCourses([...enrolledCourses, courseId]);
    } catch (error) {
      console.error("❌ Error enrolling in course:", error);
      alert("❌ Failed to enroll. Make sure you're logged in as STUDENT.");
    }
  };

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>

      {loadingCourses ? (
        <p>⏳ Loading courses...</p>
      ) : courses.length === 0 ? (
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
              <br />
              {enrolledCourses.includes(course.id) ? (
                <button disabled>✔ Enrolled</button>
              ) : (
                <button onClick={() => handleEnroll(course.id)}>Enroll</button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Divider */}
      {enrolledCourses.length > 0 && <hr style={{ margin: "40px 0" }} />}

      {/* Enrolled Courses Section */}
      {enrolledCourses.length > 0 && (
        <div className="enrolled-courses-section">
          <h2>Enrolled Courses</h2>
          {loadingEnrolled ? (
            <p>⏳ Loading enrolled courses...</p>
          ) : (
            <ul className="course-list">
              {courses
                .filter((course) => enrolledCourses.includes(course.id))
                .map((course) => (
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
      )}
    </div>
  );
};

export default CourseList;
