import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseForm from './CourseForm';
import CourseList from './CourseList';

const CourseManagement = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useContext(AppContext);
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState('');

  const handleAdd = (name) => {
    if (!name.trim()) {
      setError('Course name cannot be empty');
      return;
    }
    
    if (courses.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      setError('Course with this name already exists');
      return;
    }
    
    addCourse(name);
    setError('');
  };

  const handleUpdate = (id, name) => {
    if (!name.trim()) {
      setError('Course name cannot be empty');
      return;
    }
    
    if (courses.some(c => c.id !== id && c.name.toLowerCase() === name.toLowerCase())) {
      setError('Course with this name already exists');
      return;
    }
    
    updateCourse(id, name);
    setEditingCourse(null);
    setError('');
  };

  const handleDelete = (id) => {
    const result = deleteCourse(id);
    if (!result.success) {
      setError(result.message);
    } else {
      setError('');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setError('');
  };

  return (
    <div>
      <h2>Course Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <CourseForm 
        onAdd={handleAdd} 
        onUpdate={handleUpdate} 
        editingCourse={editingCourse}
        onCancelEdit={handleCancelEdit}
      />
      
      <CourseList 
        courses={courses} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default CourseManagement;
