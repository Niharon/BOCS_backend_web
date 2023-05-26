import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CourseProvider } from "./context/CourseProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <App />
          <Toaster />
        </CourseProvider>


      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
