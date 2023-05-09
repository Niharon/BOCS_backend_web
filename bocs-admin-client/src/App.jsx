import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllCourses from "./pages/Courses/AllCourses";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddNewCourse from "./pages/Courses/AddNewCourse";
import EditCourse from "./pages/Courses/EditCourse";
import CourseRequest from "./pages/CourseRequest/CourseRequest";
import CourseRequestEdit from "./pages/CourseRequest/CourseRequestEdit";
import Users from "./pages/users/Users";
import NotFoundPage from "./pages/NotFoundPage";
import AddQuizes from "./pages/Courses/AddQuizes";

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

          {/* Quiz route */}

          <Route path="/courses/edit/:id/lesson/:lessonid" element={<AddQuizes/>}/>

          <Route path="/course-request" element={<CourseRequest />} />
          <Route path="/course-request/edit/:id" element={<CourseRequestEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </QueryClientProvider>
    </CourseContext.Provider>
  );
}

export default App;
