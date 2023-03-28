import React, { useState } from "react";
import styled from "./StudentApply.module.css";
import { useQuery, useMutation } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const StudentApply = ({ id }) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    projectName: "",
    isValid: false,
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    const { teacherName, projectName } = formData;
    const projectId = data.filter((project) => {
      if (
        project.teacherName == teacherName &&
        project.projectName == projectName
      ) {
        return true;
      }
    })[0].projectId;
    const studentId = id;

    setFormData({
        teacherName: "",
        projectName: "",
        isValid: false,
      });
    mutate({
        projectId , 
        studentId
    });
  };

  const { mutate, data :  data2 , isLoading:  isLoading2 , error:  error2 } = useMutation(async (data) => {
    try {
      let response = await fetch("http://localhost:3000/student/apply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status == 500) {
        throw { message: responseData.message };
      }
      return responseData;
    } catch (error) {
      throw { message: error.message };
    }
  });

  function changeFormData(fieldName, fieldValue) {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [fieldName]: fieldValue };
      const isValid =
        newFormData.projectName !== "" && newFormData.teacherName !== "";
      return { ...newFormData, isValid: isValid };
    });
  }

  const { data , error, isLoading, isError } = useQuery(
    "all-projects",
    async () => {
      try {
        let allProjects = await fetch(
          "http://localhost:3000/general/getAllProjects/"
        );
        const data = await allProjects.json();
        if (allProjects.status == 500) {
          throw { message: data.message };
        }
        return data;
      } catch (error) {
        throw { message: error.message };
      }
    },
    {
      select: ({ projects }) => {
        projects = projects.map((project) => {
          return {
            projectName: project.name,
            projectId: project._id,
            teacherName: project.teacherDetails.name,
          };
        });
        return projects;
      },
    }
  );

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
    <div className={styled["apply-container"]}>
      <form className={styled["form"]} onSubmit={(e) => onSubmitHandler(e)}>
        {error2 && <div className={styled["warning"]}>{error2.message}</div>}
        {data2 && <div className={styled['success']}>{data2.message}</div>}
        <select
          disabled={isLoading2}
          className={styled["form-select"]}
          onChange={(e) => changeFormData("teacherName", e.target.value)}
        >
          <option
            disabled
            key="placeholder"
            className={styled["form-option"]}
            value=""
            selected={formData.teacherName == ""}
          >
            Choose a teacher.
          </option>

          {data.map((project) => {
            const { projectId, teacherName } = project;
            return (
              <option
                key={projectId}
                className={styled["form-option"]}
                value={teacherName}
              >
                {teacherName}
              </option>
            );
          })}
        </select>
        <select
          disabled={!formData.teacherName}
          className={styled["form-select"]}
          onChange={(e) => changeFormData("projectName", e.target.value)}
        >
          <option
            disabled
            key="placeholder"
            className={styled["form-option"]}
            value=""
            selected={formData.projectName == ""}
          >
            Choose a Project.
          </option>
          {data.map((project) => {
            const { teacherName } = formData;
            const projectTeacherName = project.teacherName;
            const { projectId, projectName } = project;
            if (teacherName != projectTeacherName) {
              return null;
            }
            return (
              <option
                key={projectId}
                className={styled["form-option"]}
                value={projectName}
              >
                {projectName}
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
    </div>
  );
};

export default StudentApply;
