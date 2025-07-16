import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/courses", {
        title,
        description,
      });
      console.log("Course added:", response.data);
      alert("Course added successfully!");
      navigate("/courses"); // Redirect to course list after adding
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
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
