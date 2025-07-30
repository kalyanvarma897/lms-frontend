import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingEnrolled, setLoadingEnrolled] = useState(true);

  const role = localStorage.getItem("role");

  // Fetch all courses and enrolled ones
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchEnrollmentCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ moved here
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

  // Enroll student in course
  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token"); // ✅ moved here

      await axios.post(
        `/api/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Enrolled successfully!");
      setEnrolledCourses([...enrolledCourses, courseId]);
    } catch (error) {
      console.error("❌ Error enrolling in course:", error);
      alert("❌ Failed to enroll. Make sure you're logged in as STUDENT.");
    }
  };

  // Delete course (admin/instructor)
  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // ✅ moved here

      await axios.delete(`/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(courses.filter((course) => course.id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
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

              {/* 🧑‍🎓 Student: Enroll */}
              {role === "STUDENT" ? (
                enrolledCourses.includes(course.id) ? (
                  <button disabled>✔ Enrolled</button>
                ) : (
                  <button onClick={() => handleEnroll(course.id)}>Enroll</button>
                )
              ) : null}

              {/* 🗑️ Admin/Instructor: Delete */}
              {(role === "ADMIN" || role === "INSTRUCTOR") && (
                <button
                  onClick={() => handleDelete(course.id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  ❌ Delete
                </button>
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
