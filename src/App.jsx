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



function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/accounts/login' element={<Login/>}/>
          <Route path='/accounts/signup' element={<Signup/>}/>
          <PrivateRoute path="/accounts/student/home" component={<StudentAllProject/>} />
          <PrivateRoute path="/accounts/student/apply" component={<StudentApply/>} />
          <PrivateRoute path="/accounts/faculty/home" component={<FacultyAllResponse/>} />
          <PrivateRoute path="/accounts/faculty/add-project" component={<FacultyAddProject/>} />
          <PrivateRoute path="/accouts/admin/home" component={<AdminAllResponse/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
