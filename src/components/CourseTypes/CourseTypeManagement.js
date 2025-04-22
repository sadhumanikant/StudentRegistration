import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseTypeForm from './CourseTypeForm';
import CourseTypeList from './CourseTypeList';

const CourseTypeManagement = () => {
  const { courseTypes, addCourseType, updateCourseType, deleteCourseType } = useContext(AppContext);
  const [editingCourseType, setEditingCourseType] = useState(null);
  const [error, setError] = useState('');

  const handleAdd = (name) => {
    if (!name.trim()) {
      setError('Course type name cannot be empty');
      return;
    }
    
    if (courseTypes.some(ct => ct.name.toLowerCase() === name.toLowerCase())) {
      setError('Course type with this name already exists');
      return;
    }
    
    addCourseType(name);
    setError('');
  };

  const handleUpdate = (id, name) => {
    if (!name.trim()) {
      setError('Course type name cannot be empty');
      return;
    }
    
    if (courseTypes.some(ct => ct.id !== id && ct.name.toLowerCase() === name.toLowerCase())) {
      setError('Course type with this name already exists');
      return;
    }
    
    updateCourseType(id, name);
    setEditingCourseType(null);
    setError('');
  };

  const handleDelete = (id) => {
    const result = deleteCourseType(id);
    if (!result.success) {
      setError(result.message);
    } else {
      setError('');
    }
  };

  const handleEdit = (courseType) => {
    setEditingCourseType(courseType);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingCourseType(null);
    setError('');
  };

  return (
    <div>
      <h2>Course Type Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <CourseTypeForm 
        onAdd={handleAdd} 
        onUpdate={handleUpdate} 
        editingCourseType={editingCourseType}
        onCancelEdit={handleCancelEdit}
      />
      
      <CourseTypeList 
        courseTypes={courseTypes} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default CourseTypeManagement;
