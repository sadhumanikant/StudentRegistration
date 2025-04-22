import React, { useState, useEffect } from 'react';

const CourseTypeForm = ({ onAdd, onUpdate, editingCourseType, onCancelEdit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingCourseType) {
      setName(editingCourseType.name);
    } else {
      setName('');
    }
  }, [editingCourseType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourseType) {
      onUpdate(editingCourseType.id, name);
    } else {
      onAdd(name);
      setName('');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {editingCourseType ? 'Edit Course Type' : 'Add New Course Type'}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="courseTypeName" className="form-label">Course Type Name</label>
            <input
              type="text"
              className="form-control"
              id="courseTypeName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Individual, Group, Special"
              required
            />
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary">
              {editingCourseType ? 'Update' : 'Add'} Course Type
            </button>
            {editingCourseType && (
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

export default CourseTypeForm;
