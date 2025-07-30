import React from "react";
import axios from "../../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddInstructor = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("/admin/add-instructor", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        alert("Instructor added successfully!");
        resetForm();
      } catch (error) {
        console.error("Error adding instructor:", error.response?.data || error.message);
        alert("Failed to add instructor. Please try again.");
      }
    },
  });

  return (
    <div className="form-container">
      <h2>Add Instructor</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div>{formik.errors.name}</div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div>{formik.errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div>{formik.errors.password}</div>
        )}

        <button type="submit">Add Instructor</button>
      </form>
    </div>
  );
};

export default AddInstructor;
