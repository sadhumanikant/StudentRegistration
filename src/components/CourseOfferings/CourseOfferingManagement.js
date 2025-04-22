import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseOfferingForm from './CourseOfferingForm';
import CourseOfferingList from './CourseOfferingList';

const CourseOfferingManagement = () => {
  const { 
    courseOfferings, 
    addCourseOffering, 
    updateCourseOffering, 
    deleteCourseOffering,
    courseTypes,
    courses
  } = useContext(AppContext);
  
  const [editingOffering, setEditingOffering] = useState(null);
  const [error, setError] = useState('');

  const handleAdd = (courseId, courseTypeId) => {
    const result = addCourseOffering(courseId, courseTypeId);
    if (!result.success) {
      setError(result.message);
    } else {
      setError('');
    }
  };

  const handleUpdate = (id, courseId, courseTypeId) => {
    const result = updateCourseOffering(id, courseId, courseTypeId);
    if (!result.success) {
      setError(result.message);
    } else {
      setEditingOffering(null);
      setError('');
    }
  };

  const handleDelete = (id) => {
    const result = deleteCourseOffering(id);
    if (!result.success) {
      setError(result.message);
    } else {
      setError('');
    }
  };

  const handleEdit = (offering) => {
    setEditingOffering(offering);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingOffering(null);
    setError('');
  };

  return (
    <div>
      <h2>Course Offering Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <CourseOfferingForm 
        onAdd={handleAdd} 
        onUpdate={handleUpdate} 
        editingOffering={editingOffering}
        onCancelEdit={handleCancelEdit}
        courseTypes={courseTypes}
        courses={courses}
      />
      
      <CourseOfferingList 
        courseOfferings={courseOfferings} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        courseTypes={courseTypes}
        courses={courses}
      />
    </div>
  );
};

export default CourseOfferingManagement;
