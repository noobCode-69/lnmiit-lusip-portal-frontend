import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import PrivateRoute from "./components/HigherOrderComponents/PrivateRoute/PrivateRoute";
import IsLoggedIn from "./components/HigherOrderComponents/IsLoggedIn/IsLoggedIn";
import AdminAllResponse from "./components/AdminAllResponse/AdminAllResponse";
import FacultyAddProject from "./components/FacultyAddProject/FacultyAddProject";
import FacultyAllResponse from "./components/FacultyAllResponse/FacultyAllResponse";
import StudentAllProject from "./components/StudentAllProject/StudentAllProject";
import StudentApply from "./components/StudentApply/StudentApply";
import StudentLayout from "./components/HigherOrderComponents/StudentLayout/StudentLayout";
import TeacherLayout from "./components/HigherOrderComponents/TeacherLayout/TeacherLayout";
import AdminLayout from "./components/HigherOrderComponents/AdminLayout/AdminLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IsLoggedIn component={Home} />} />
          <Route
            path="/accounts/login"
            element={<IsLoggedIn component={Login} />}
          />
          <Route
            path="/accounts/signup"
            element={<IsLoggedIn component={Signup} />}
          />
          <Route
            path="/accounts/student/home/:studentId"
            element={
              <PrivateRoute
                component={StudentLayout(StudentAllProject)}
                path="/accounts/student/home"
              />
            }
          />
          <Route
            path="/accounts/student/apply/:studentId"
            element={
              <PrivateRoute
                component={StudentLayout(StudentApply)}
                path="/accounts/student/apply"
              />
            }
          />
          <Route
            path="/accounts/faculty/home/:facultyId"
            element={
              <PrivateRoute
                component={TeacherLayout(FacultyAllResponse)}
                path="/accounts/faculty/home"
              />
            }
          />
          <Route
            path="/accounts/faculty/add-project/:facultyId"
            element={
              <PrivateRoute
                component={TeacherLayout(FacultyAddProject)}
                path="/accounts/faculty/add-project"
              />
            }
          />
          <Route
            path="/accounts/admin/home/:adminId"
            element={
              <PrivateRoute
                component={AdminLayout(AdminAllResponse)}
                path="/accounts/admin/home"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
