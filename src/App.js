import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CourseTypeManagement from './components/CourseTypes/CourseTypeManagement';
import CourseManagement from './components/Courses/CourseManagement';
import CourseOfferingManagement from './components/CourseOfferings/CourseOfferingManagement';
import StudentRegistrationManagement from './components/StudentRegistrations/StudentRegistrationManagement';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course-types" element={<CourseTypeManagement />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/course-offerings" element={<CourseOfferingManagement />} />
              <Route path="/student-registrations" element={<StudentRegistrationManagement />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
