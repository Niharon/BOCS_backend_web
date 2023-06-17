import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import AllCourses from "./pages/Courses/AllCourses";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddNewCourse from "./pages/Courses/AddNewCourse";
import EditCourse from "./pages/Courses/EditCourse";
import CourseRequest from "./pages/CourseRequest/CourseRequest";
import CourseRequestEdit from "./pages/CourseRequest/CourseRequestEdit";
import Users from "./pages/users/Users";
import NotFoundPage from "./pages/NotFoundPage";
import AddQuizes from "./pages/Courses/AddQuizes";
import Login from "./pages/Login/Login";
import RequireAuth from "./auth/RequireAuth";
import Instructors from "./pages/Instructors/Instructors";
import EditInstructor from "./pages/Instructors/EditInstructor";
import AddInstructor from "./pages/Instructors/AddInstructor";
import EditUser from "./pages/users/EditUser";


function App() {


  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,

        },
      },
    }
  );

  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);


  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (

    <QueryClientProvider client={queryClient}>
      <Routes>


        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />


        <Route element={<RequireAuth />}>


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/all" element={<AllCourses />} />
          <Route path="/courses/add" element={<AddNewCourse />} />
          <Route path="/courses/edit/:id" element={<EditCourse />} />

          {/* Quiz route */}

          <Route path="/courses/edit/:id/lesson/:lessonid" element={<AddQuizes />} />

          <Route path="/course-request" element={<CourseRequest />} />
          <Route path="/course-request/edit/:id" element={<CourseRequestEdit />} />

          {/* user routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<EditUser />} />


          {/* instructors */}

          <Route path="/instructors" element={<Instructors />} />
          <Route path="/instructors/add" element={<AddInstructor />} />
          <Route path="/instructors/edit/:id" element={<EditInstructor />} />

        </Route>

        {/* catch all routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </QueryClientProvider>

  );
}

export default App;
