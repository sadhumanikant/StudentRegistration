import React, { useState } from 'react';

const CourseOfferingList = ({ 
  courseOfferings, 
  onEdit, 
  onDelete,
  courseTypes
}) => {
  const [filterTypeId, setFilterTypeId] = useState('');

  const filteredOfferings = filterTypeId 
    ? courseOfferings.filter(offering => offering.courseTypeId === parseInt(filterTypeId))
    : courseOfferings;

  if (courseOfferings.length === 0) {
    return <div className="alert alert-info mt-3">No course offerings available. Please add one.</div>;
  }

  return (
    <div className="mt-4">
      <h3>Available Course Offerings</h3>
      
      <div className="mb-3">
        <label htmlFor="filterType" className="form-label">Filter by Course Type</label>
        <select
          className="form-select"
          id="filterType"
          value={filterTypeId}
          onChange={(e) => setFilterTypeId(e.target.value)}
        >
          <option value="">All Course Types</option>
          {courseTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      
      {filteredOfferings.length === 0 ? (
        <div className="alert alert-info">No course offerings match the selected filter.</div>
      ) : (
        <div className="list-group">
          {filteredOfferings.map(offering => (
            <div key={offering.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span>{offering.name}</span>
              <div>
                <button 
                  className="btn btn-sm btn-outline-primary me-2" 
                  onClick={() => onEdit(offering)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger" 
                  onClick={() => onDelete(offering.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseOfferingList;
