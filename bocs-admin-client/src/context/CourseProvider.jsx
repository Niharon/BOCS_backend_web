
import { createContext, useState } from "react";

const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {

    const [courseContext, setcourseContext] = useState({
        courses: [],
        currentCourse: null,
      });
    
    return (
        <CourseContext.Provider value={{ courseContext, setcourseContext }}>
        {children}
        </CourseContext.Provider>
    );
};

export default CourseContext;