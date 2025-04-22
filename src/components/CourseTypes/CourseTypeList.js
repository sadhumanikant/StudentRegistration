import React from 'react';

const CourseTypeList = ({ courseTypes, onEdit, onDelete }) => {
  if (courseTypes.length === 0) {
    return <div className="alert alert-info mt-3">No course types available. Please add one.</div>;
  }

  return (
    <div className="mt-4">
      <h3>Available Course Types</h3>
      <div className="list-group">
        {courseTypes.map(courseType => (
          <div key={courseType.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>{courseType.name}</span>
            <div>
              <button 
                className="btn btn-sm btn-outline-primary me-2" 
                onClick={() => onEdit(courseType)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => onDelete(courseType.id)}
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

export default CourseTypeList;
