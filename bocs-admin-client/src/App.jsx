import { createContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllCourses from "./pages/Courses/AllCourses";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddNewCourse from "./pages/Courses/AddNewCourse";
import EditCourse from "./pages/Courses/EditCourse";

export const CourseContext = createContext(null);

function App() {
  const [courseContext, setcourseContext] = useState({
    courses: [],
    currentCourse: null,
  });

  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <CourseContext.Provider value={{ courseContext, setcourseContext }}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* <Route path="/dashboard" element={<Analytics />} /> */}
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/all" element={<AllCourses />} />
          <Route path="/courses/add" element={<AddNewCourse />} />
          <Route path="/courses/edit/:id" element={<EditCourse />} />
        </Routes>
      </QueryClientProvider>
    </CourseContext.Provider>
  );
}

export default App;
