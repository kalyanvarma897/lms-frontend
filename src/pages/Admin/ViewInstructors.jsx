import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';

const ViewInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors on component mount
  useEffect(() => {
    axiosInstance
      .get('/admin/users-by-role?role=INSTRUCTOR')
      .then((response) => setInstructors(response.data))
      .catch((error) => console.error('Error fetching instructors:', error));
  }, []);

  // Handle delete instructor
  const handleDelete = async (instructorId) => {
    const confirm = window.confirm("Are you sure you want to delete this instructor?");
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/admin/delete-user/${instructorId}`);
      setInstructors(instructors.filter((instructor) => instructor.id !== instructorId));
      alert('Instructor deleted successfully!');
    } catch (error) {
      console.error('Error deleting instructor:', error);
      alert('Failed to delete instructor. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Instructor List</h2>

      {instructors.length === 0 ? (
        <p>No instructors found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>S.No</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={instructor.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{instructor.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{instructor.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <button onClick={() => handleDelete(instructor.id)}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewInstructors;
