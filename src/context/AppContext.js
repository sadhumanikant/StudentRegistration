import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState(() => {
    const savedCourseTypes = localStorage.getItem('courseTypes');
    return savedCourseTypes ? JSON.parse(savedCourseTypes) : [
      { id: 1, name: 'Individual' },
      { id: 2, name: 'Group' },
      { id: 3, name: 'Special' }
    ];
  });

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [
      { id: 1, name: 'Hindi' },
      { id: 2, name: 'English' },
      { id: 3, name: 'Urdu' }
    ];
  });

  const [courseOfferings, setCourseOfferings] = useState(() => {
    const savedOfferings = localStorage.getItem('courseOfferings');
    return savedOfferings ? JSON.parse(savedOfferings) : [
      { id: 1, courseId: 1, courseTypeId: 1, name: 'Individual - Hindi' },
      { id: 2, courseId: 2, courseTypeId: 2, name: 'Group - English' }
    ];
  });

  const [studentRegistrations, setStudentRegistrations] = useState(() => {
    const savedRegistrations = localStorage.getItem('studentRegistrations');
    return savedRegistrations ? JSON.parse(savedRegistrations) : [];
  });

  useEffect(() => {
    localStorage.setItem('courseTypes', JSON.stringify(courseTypes));
  }, [courseTypes]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('courseOfferings', JSON.stringify(courseOfferings));
  }, [courseOfferings]);

  useEffect(() => {
    localStorage.setItem('studentRegistrations', JSON.stringify(studentRegistrations));
  }, [studentRegistrations]);

  const addCourseType = (name) => {
    const newId = courseTypes.length > 0 ? Math.max(...courseTypes.map(ct => ct.id)) + 1 : 1;
    setCourseTypes([...courseTypes, { id: newId, name }]);
  };

  const updateCourseType = (id, name) => {
    setCourseTypes(courseTypes.map(ct => ct.id === id ? { ...ct, name } : ct));
    
    setCourseOfferings(courseOfferings.map(co => {
      if (co.courseTypeId === id) {
        const course = courses.find(c => c.id === co.courseId);
        return {
          ...co,
          name: `${name} - ${course?.name}`
        };
      }
      return co;
    }));
  };

  const deleteCourseType = (id) => {
    const inUse = courseOfferings.some(co => co.courseTypeId === id);
    if (inUse) {
      return { success: false, message: 'Cannot delete: Course type is in use by course offerings' };
    }
    
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
    return { success: true };
  };

  const addCourse = (name) => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name }]);
  };

  const updateCourse = (id, name) => {
    setCourses(courses.map(c => c.id === id ? { ...c, name } : c));
    
    setCourseOfferings(courseOfferings.map(co => {
      if (co.courseId === id) {
        const courseType = courseTypes.find(ct => ct.id === co.courseTypeId);
        return {
          ...co,
          name: `${courseType?.name} - ${name}`
        };
      }
      return co;
    }));
  };

  const deleteCourse = (id) => {
    const inUse = courseOfferings.some(co => co.courseId === id);
    if (inUse) {
      return { success: false, message: 'Cannot delete: Course is in use by course offerings' };
    }
    
    setCourses(courses.filter(c => c.id !== id));
    return { success: true };
  };

  const addCourseOffering = (courseId, courseTypeId) => {
    const course = courses.find(c => c.id === courseId);
    const courseType = courseTypes.find(ct => ct.id === courseTypeId);
    
    if (!course || !courseType) {
      return { success: false, message: 'Invalid course or course type' };
    }
    
    const name = `${courseType.name} - ${course.name}`;
    const newId = courseOfferings.length > 0 ? Math.max(...courseOfferings.map(co => co.id)) + 1 : 1;
    
    setCourseOfferings([...courseOfferings, { 
      id: newId, 
      courseId, 
      courseTypeId, 
      name 
    }]);
    
    return { success: true };
  };

  const updateCourseOffering = (id, courseId, courseTypeId) => {
    const course = courses.find(c => c.id === courseId);
    const courseType = courseTypes.find(ct => ct.id === courseTypeId);
    
    if (!course || !courseType) {
      return { success: false, message: 'Invalid course or course type' };
    }
    
    const name = `${courseType.name} - ${course.name}`;
    
    setCourseOfferings(courseOfferings.map(co => 
      co.id === id ? { ...co, courseId, courseTypeId, name } : co
    ));
    
    return { success: true };
  };

  const deleteCourseOffering = (id) => {
    const inUse = studentRegistrations.some(sr => sr.courseOfferingId === id);
    if (inUse) {
      return { success: false, message: 'Cannot delete: Course offering has student registrations' };
    }
    
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
    return { success: true };
  };

  const addStudentRegistration = (name, email, courseOfferingId) => {
    const newId = studentRegistrations.length > 0 
      ? Math.max(...studentRegistrations.map(sr => sr.id)) + 1 
      : 1;
    
    setStudentRegistrations([...studentRegistrations, { 
      id: newId, 
      name, 
      email, 
      courseOfferingId,
      registrationDate: new Date().toISOString()
    }]);
    
    return { success: true };
  };

  const getStudentsByCourseOffering = (courseOfferingId) => {
    return studentRegistrations.filter(sr => sr.courseOfferingId === courseOfferingId);
  };

  return (
    <AppContext.Provider value={{
      courseTypes,
      courses,
      courseOfferings,
      studentRegistrations,
      addCourseType,
      updateCourseType,
      deleteCourseType,
      addCourse,
      updateCourse,
      deleteCourse,
      addCourseOffering,
      updateCourseOffering,
      deleteCourseOffering,
      addStudentRegistration,
      getStudentsByCourseOffering
    }}>
      {children}
    </AppContext.Provider>
  );
};
