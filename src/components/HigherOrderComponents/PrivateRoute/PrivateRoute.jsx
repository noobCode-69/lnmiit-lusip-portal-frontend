import React from "react";
import styled from "./PrivateRoute.module.css";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

function PrivateRoute({ component: Component, ...rest }) {
  const session = JSON.parse(localStorage.getItem("session"));

  const { data, isLoading, error } = useQuery(
    "session-in-private-route",
    async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI + "api/session/getSessionDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const responseData = await response.json();
        if (response.status == 500) {
          throw { message: responseData.message };
        }
        return responseData;
      } catch (error) {
        throw { message: error.message };
      }
    },
    {
      enabled: session !== null,
      cacheTime: 0,
    }
  );

  if (isLoading) {
    return (
      <div className={styled["loading-container"]}>
        <Loading />
      </div>
    );
  }

  if (error) {
    localStorage.removeItem("session");
    return <Navigate to="/accounts/login" replace />;
  }

  if (data) {
    const { role } = data;
    const isStudent = role === "student";
    const isTeacher = role === "teacher";
    const isAdmin = role === "admin";
    if (
      (isStudent && !rest.path.startsWith("/accounts/student")) ||
      (isTeacher && !rest.path.startsWith("/accounts/faculty")) ||
      (isAdmin && !rest.path.startsWith("/accounts/admin"))
    ) {
      return <Navigate to={`/accounts/login`} replace />;
    }
    return <Component />;
  }
}

export default PrivateRoute;
