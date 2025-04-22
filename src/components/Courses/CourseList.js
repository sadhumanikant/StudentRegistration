import React from 'react';

const CourseList = ({ courses, onEdit, onDelete }) => {
  if (courses.length === 0) {
    return <div className="alert alert-info mt-3">No courses available. Please add one.</div>;
  }

  return (
    <div className="mt-4">
      <h3>Available Courses</h3>
      <div className="list-group">
        {courses.map(course => (
          <div key={course.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>{course.name}</span>
            <div>
              <button 
                className="btn btn-sm btn-outline-primary me-2" 
                onClick={() => onEdit(course)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => onDelete(course.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
