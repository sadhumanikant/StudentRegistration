import React from 'react';

const StudentRegistrationList = ({ 
  courseOfferings, 
  onOfferingSelect, 
  selectedOfferingId,
  students 
}) => {
  if (courseOfferings.length === 0) {
    return <div className="alert alert-info mt-3">No course offerings available. Please create course offerings first.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="mt-4">
      <h3>View Registered Students</h3>
      
      <div className="mb-3">
        <label htmlFor="offeringSelect" className="form-label">Select Course Offering</label>
        <select
          className="form-select"
          id="offeringSelect"
          value={selectedOfferingId}
          onChange={(e) => onOfferingSelect(e.target.value)}
        >
          <option value="">Select a course offering</option>
          {courseOfferings.map(offering => (
            <option key={offering.id} value={offering.id}>{offering.name}</option>
          ))}
        </select>
      </div>
      
      {selectedOfferingId && (
        <div>
          <h4>
            Registered Students for {courseOfferings.find(o => o.id === parseInt(selectedOfferingId))?.name}
          </h4>
          
          {students.length === 0 ? (
            <div className="alert alert-info">No students registered for this course offering.</div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{formatDate(student.registrationDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentRegistrationList;
