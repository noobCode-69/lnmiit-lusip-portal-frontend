import React from 'react'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import PrivateRoute from './components/HigherOrderComponents/PrivateRoute/PrivateRoute'
import AdminAllResponse from './components/AdminAllResponse/AdminAllResponse'
import FacultyAddProject from './components/FacultyAddProject/FacultyAddProject'
import FacultyAllResponse from './components/FacultyAllResponse/FacultyAllResponse'
import StudentAllProject from './components/StudentAllProject/StudentAllProject'
import StudentApply from './components/StudentApply/StudentApply'
import StudentLayout from './components/HigherOrderComponents/StudentLayout/StudentLayout'
import TeacherLayout from './components/HigherOrderComponents/TeacherLayout/TeacherLayout'

function App() {
  return (
    <div >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/accounts/login' element={<Login/>}/>
            <Route path='/accounts/signup' element={<Signup/>}/>
            <Route path="/accounts/student/home/:studentId" element={<PrivateRoute component={ StudentLayout(StudentAllProject)} path="/accounts/student/home"/>} />
            <Route path="/accounts/student/apply/:studentId" element={<PrivateRoute component={StudentLayout(StudentApply)} path="/accounts/student/apply"/>} />
            <Route path="/accounts/faculty/home/:facultyId" element={<PrivateRoute component={TeacherLayout(FacultyAllResponse)} path="/accounts/faculty/home"/>} />
            <Route path="/accounts/faculty/add-project/:facultyId" element={<PrivateRoute component={TeacherLayout(FacultyAddProject)} path="/accounts/faculty/add-project"/>} />
            <Route path="/accouts/admin/home/:adminId" element={<PrivateRoute component={AdminAllResponse} path="/accouts/admin/home"/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
