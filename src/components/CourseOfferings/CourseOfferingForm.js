import React, { useState, useEffect } from 'react';

const CourseOfferingForm = ({ 
  onAdd, 
  onUpdate, 
  editingOffering, 
  onCancelEdit,
  courseTypes,
  courses
}) => {
  const [courseId, setCourseId] = useState('');
  const [courseTypeId, setCourseTypeId] = useState('');

  useEffect(() => {
    if (editingOffering) {
      setCourseId(editingOffering.courseId);
      setCourseTypeId(editingOffering.courseTypeId);
    } else {
      setCourseId('');
      setCourseTypeId('');
    }
  }, [editingOffering]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOffering) {
      onUpdate(editingOffering.id, parseInt(courseId), parseInt(courseTypeId));
    } else {
      onAdd(parseInt(courseId), parseInt(courseTypeId));
      setCourseId('');
      setCourseTypeId('');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {editingOffering ? 'Edit Course Offering' : 'Add New Course Offering'}
        </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="courseSelect" className="form-label">Course</label>
            <select
              className="form-select"
              id="courseSelect"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="courseTypeSelect" className="form-label">Course Type</label>
            <select
              className="form-select"
              id="courseTypeSelect"
              value={courseTypeId}
              onChange={(e) => setCourseTypeId(e.target.value)}
              required
            >
              <option value="">Select a course type</option>
              {courseTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary">
              {editingOffering ? 'Update' : 'Add'} Course Offering
            </button>
            {editingOffering && (
              <button 
                type="button" 
                className="btn btn-secondary ms-2" 
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseOfferingForm;
