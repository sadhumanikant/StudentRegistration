import React, { useState, useEffect } from 'react';

const CourseForm = ({ onAdd, onUpdate, editingCourse, onCancelEdit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingCourse) {
      setName(editingCourse.name);
    } else {
      setName('');
    }
  }, [editingCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      onUpdate(editingCourse.id, name);
    } else {
      onAdd(name);
      setName('');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {editingCourse ? 'Edit Course' : 'Add New Course'}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="courseName" className="form-label">Course Name</label>
            <input
              type="text"
              className="form-control"
              id="courseName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hindi, English, Urdu"
              required
            />
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary">
              {editingCourse ? 'Update' : 'Add'} Course
            </button>
            {editingCourse && (
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

export default CourseForm;
