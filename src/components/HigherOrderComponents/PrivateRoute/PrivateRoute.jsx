import React from "react";
import { Route } from "react-router";
import {Navigate} from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    const userRole = 'admin';


    const isAuthenticated = userRole !== null;
    if (!isAuthenticated) {
      return <Navigate to="/accounts/login" replace />;
    }
    const isStudent = userRole === 'student';
    const isTeacher = userRole === 'teacher';
    const isAdmin = userRole === 'admin';
    if (
      (isStudent && !rest.path.startsWith('/accounts/student')) ||
      (isTeacher && !rest.path.startsWith('/accounts/faculty')) ||
      (isAdmin && !rest.path.startsWith('/accounts/admin'))
    ) {
      return <Navigate to={`/accounts/login`} replace />;
    }
    return <Component/>;
  }


  export default PrivateRoute;




  /**
   * 
   * 1) extract the cookie from localStrage 
   * 2) if not present => redirect to login
   * 2) validate the cookie from the backend
   * 3) if valid proceed , if invalid => logout the redirect to login
  * is logged in will be used for home route , login route , signup route
  * 
  * 
  * 
  * 
  
  */

