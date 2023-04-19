import React from "react";
import styled from "./AdminToggleRegistration.module.css";
import { useQuery, useMutation } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import client from "../../queryClient";
const AdminToggleRegistration = ({ id, typeId }) => {
  const { data, error, isLoading, isError } = useQuery(
    "admin-toggle-registration-registration-status-admin",
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

  const {
    mutate,
    data: data2,
    error: error2,
    isLoading: isLoading2,
    isError: isError2,
  } = useMutation(
    async () => {
      try {
        let response = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI +
            "api/admin/toggleRegistrationStatus/",
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
      onSettled: () => {
        client.invalidateQueries([
          "admin-toggle-registration-registration-status-admin",
        ]);
      },
    }
  );

  const handleToggleClick = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <div className={styled["loading-container"]}>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styled["error-container"]}>
        <Error message={error.message} />
      </div>
    );
  }

  return (
    <div className={styled["toggle-registration-container"]}>
      <h2 className={styled["message"]}>
        Registrations are currently{" "}
        {data.status == true ? <span>OPENED</span> : <span>CLOSED</span>}
      </h2>
      <div className={styled["toggle-button-container"]}>
        <div onClick={handleToggleClick} className={styled["toggle-button"]}>
          {isLoading2 ? "Loading..." : "Toggle"}
        </div>
      </div>
    </div>
  );
};

export default AdminToggleRegistration;
