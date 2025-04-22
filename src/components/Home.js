import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to Student Registration System</h1>
      <p className="lead">
        This system allows you to manage course types, courses, course offerings, and student registrations.
      </p>
      <hr className="my-4" />
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Course Types</h5>
              <p className="card-text">Manage different types of courses like Individual, Group, etc.</p>
              <Link to="/course-types" className="btn btn-primary">Manage Course Types</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Courses</h5>
              <p className="card-text">Manage courses like Hindi, English, Urdu, etc.</p>
              <Link to="/courses" className="btn btn-primary">Manage Courses</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Course Offerings</h5>
              <p className="card-text">Create and manage course offerings by combining courses and types.</p>
              <Link to="/course-offerings" className="btn btn-primary">Manage Offerings</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Student Registrations</h5>
              <p className="card-text">Register students for available course offerings.</p>
              <Link to="/student-registrations" className="btn btn-primary">Manage Registrations</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
