import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  // Fetch students on component mount
  useEffect(() => {
    axiosInstance
      .get('/admin/users-by-role?role=STUDENT')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Handle delete student
  const handleDelete = async (studentId) => {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/admin/delete-user/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
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
            {students.map((student, index) => (
              <tr key={student.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{student.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{student.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <button onClick={() => handleDelete(student.id)}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudents;
