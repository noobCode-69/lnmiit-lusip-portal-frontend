import React, { useState } from "react";
import styled from "./FacultyDeleteProject.module.css";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

import { useMutation, useQuery } from "react-query";

const FacultyDeleteProject = ({ id, typeId }) => {
  const [formData, setFormData] = useState({
    projectId: "",
    isValid: false,
  });

  const { data, error, isLoading, isError } = useQuery(
    "faculty-delete-project-teacher-all-projects",
    async () => {
      try {
        let allProjects = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI + "api/teacher/getAllProjects/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ teacherId: typeId }),
          }
        );
        const data = await allProjects.json();
        if (allProjects.status == 500) {
          throw { message: data.message };
        }
        return data;
      } catch (error) {
        throw { message: error.message };
      }
    }
  );

  const {
    mutate,
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useMutation(async (data) => {
    try {
      let response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URI + "api/teacher/deleteProject/",
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    const { projectId } = formData;
    setFormData({
      projectId: "",
      isValid: false,
    });
    mutate({
      projectId,
    });
  };

  function changeFormData(fieldName, fieldValue) {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [fieldName]: fieldValue };
      const isValid = newFormData.projectId !== "";
      return { ...newFormData, isValid: isValid };
    });
  }

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
    <div className={styled["delete-project-parent"]}>
      {data && data.projects.length == 0 ? (
        <h1 className={styled["message"]}>No projects yet.</h1>
      ) : (
        <form onSubmit={(e) => onSubmitHandler(e)} className={styled["form"]}>
          {data2 && <div className={styled["success"]}>{data2.message}</div>}
          {error2 && <div className={styled["warning"]}>{error2.message}</div>}

          <select
            disabled={isLoading || isLoading2}
            className={styled["form-select"]}
            onChange={(e) => changeFormData("projectId", e.target.value)}
          >
            <option
              disabled
              key="placeholder"
              className={styled["form-option"]}
              value=""
              selected={formData.projectId == ""}
            >
              Select a project
            </option>

            {data.projects.map((project) => {
              return (
                <option
                  key={project._id}
                  className={styled["form-option"]}
                  value={project._id}
                >
                  {project.name}
                </option>
              );
            })}
          </select>

          <button
            className={styled["submit-button"]}
            disabled={isLoading2 || !formData.isValid}
            type="submit"
          >
            {!isLoading2 ? "Submit" : "Loading..."}
          </button>
        </form>
      )}
    </div>
  );
};

export default FacultyDeleteProject;
