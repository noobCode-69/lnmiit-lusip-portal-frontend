import React from "react";
import { Route } from "react-router";
import {Navigate} from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {


    const userRole = 'student';
    const isAuthenticated = userRole !== null;
    const isStudent = userRole === 'student';
    const isTeacher = userRole === 'teacher';
    const isAdmin = userRole === 'admin';

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            (isStudent && props.path.startsWith('/accounts/student')) ||
            (isTeacher && props.path.startsWith('/accounts/teacher')) ||
            (isAdmin && props.path.startsWith('/accounts/admin')) ? (
              <Component {...props} />
            ) : (
              <Navigate to={`/accounts/${userRole}/home`}  replace/>
            )
          ) : (
            <Redirect to="/accounts/login" replace />
          )
        }
      />
    );
  }


  export default PrivateRoute;