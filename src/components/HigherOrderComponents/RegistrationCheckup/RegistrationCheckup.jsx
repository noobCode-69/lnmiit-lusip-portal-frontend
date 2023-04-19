import React from "react";
import styled from "./RegistrationCheckup.module.css";
import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import { useQuery, useMutation } from "react-query";

import { useNavigate } from "react-router";

const RegistrationCheckup = (Component) => {
  const { data, error, isLoading, isError } = useQuery(
    "registration-checkup-registration-status",
    async () => {
      try {
        let response = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI +
            "api/general/getRegistrationStatus/",
          {
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
    }
  );

  if (isLoading) {
    return () => {
      <div className={styled["loading-container"]}>
        <Loading />
      </div>;
    };
  }

  if (isError) {
    return () => {
      return (
        <div className={styled["error-container"]}>
          <Error message={error.message} />
        </div>
      );
    };
  }

  if (data && data.status == false) {
    return () => {
      const navigate = useNavigate();

      const handleLogout = async () => {
        const { token } = JSON.parse(localStorage.getItem("session"));
        await mutate({ token: token });
        localStorage.removeItem("session");
        navigate("/accounts/login", { replace: true });
      };

      const { mutate } = useMutation(async (data) => {
        try {
          let response = await fetch(
            import.meta.env.VITE_BACKEND_BASE_URI + "api/user/logout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(data),
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
      });

      return (
        <div>
          <div className={styled["error-container"]}>
            <Error
              message={"Registration closed for now! Logout to see results!"}
            />
          </div>
          <div onClick={handleLogout} className={styled["logout-button"]}>
            LOGOUT
          </div>
        </div>
      );
    };
  }

  return () => {
    return <Component />;
  };
};

export default RegistrationCheckup;
