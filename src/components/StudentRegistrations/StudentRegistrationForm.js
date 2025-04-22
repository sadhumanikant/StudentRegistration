import React, { useState } from 'react';

const StudentRegistrationForm = ({ onRegister, courseOfferings, courseTypes }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const [filterTypeId, setFilterTypeId] = useState('');

  const filteredOfferings = filterTypeId 
    ? courseOfferings.filter(offering => offering.courseTypeId === parseInt(filterTypeId))
    : courseOfferings;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, courseOfferingId);
    setName('');
    setEmail('');
    setCourseOfferingId('');
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        Register a Student
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentEmail" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="filterType" className="form-label">Filter Course Offerings by Type</label>
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
          
          <div className="mb-3">
            <label htmlFor="courseOfferingSelect" className="form-label">Course Offering</label>
            <select
              className="form-select"
              id="courseOfferingSelect"
              value={courseOfferingId}
              onChange={(e) => setCourseOfferingId(e.target.value)}
              required
            >
              <option value="">Select a course offering</option>
              {filteredOfferings.map(offering => (
                <option key={offering.id} value={offering.id}>{offering.name}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
