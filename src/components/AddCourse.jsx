import React, { useState } from "react";
import axios from "../api/axios"; // ✅ Use your custom Axios instance
import { useNavigate } from "react-router-dom";
import "../components/AddCourse.css"; // ✅ Import your CSS file for styling
// (Optional) if you want custom styling

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage

      const response = await axios.post(
        "/api/courses",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include token in header
          },
        }
      );

      alert("Course added successfully!");
      console.log("Course response:", response.data);
      navigate("/courses"); // 👈 redirect to course list
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Make sure you're logged in with correct role.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
