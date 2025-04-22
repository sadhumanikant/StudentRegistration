import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import StudentRegistrationForm from './StudentRegistrationForm';
import StudentRegistrationList from './StudentRegistrationList';

const StudentRegistrationManagement = () => {
  const { 
    courseOfferings, 
    addStudentRegistration, 
    getStudentsByCourseOffering,
    courseTypes
  } = useContext(AppContext);
  
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (name, email, courseOfferingId) => {
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      setSuccess('');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setSuccess('');
      return;
    }
    
    const result = addStudentRegistration(name, email, parseInt(courseOfferingId));
    if (result.success) {
      setSuccess('Student registered successfully!');
      setError('');
    } else {
      setError(result.message);
      setSuccess('');
    }
  };

  const handleOfferingSelect = (id) => {
    setSelectedOfferingId(id);
    setError('');
    setSuccess('');
  };

  const students = selectedOfferingId 
    ? getStudentsByCourseOffering(parseInt(selectedOfferingId))
    : [];

  return (
    <div>
      <h2>Student Registration Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <StudentRegistrationForm 
        onRegister={handleRegister} 
        courseOfferings={courseOfferings}
        courseTypes={courseTypes}
      />
      
      <StudentRegistrationList 
        courseOfferings={courseOfferings}
        onOfferingSelect={handleOfferingSelect}
        selectedOfferingId={selectedOfferingId}
        students={students}
      />
    </div>
  );
};

export default StudentRegistrationManagement;
