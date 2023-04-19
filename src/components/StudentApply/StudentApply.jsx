import React, { useState } from "react";
import styled from "./StudentApply.module.css";
import { useQuery, useMutation } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const StudentApply = ({ id, typeId }) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    projectId: "",
    isValid: false,
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    const studentId = typeId;
    const { projectId } = formData;
    setFormData({
      teacherName: "",
      projectId: "",
      isValid: false,
    });
    mutate({
      projectId,
      studentId,
    });
  };
  const {
    mutate,
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useMutation(async (data) => {
    try {
      let response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URI + "api/student/apply/",
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

  function changeFormData(fieldName, fieldValue) {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [fieldName]: fieldValue };
      const isValid =
        newFormData.projectId !== "" && newFormData.teacherName !== "";
      return { ...newFormData, isValid: isValid };
    });
  }

  const { data, error, isLoading, isError } = useQuery(
    "student-apply-all-projects",
    async () => {
      try {
        let allProjects = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI + "api/general/getAllProjects/",
          {
            credentials: "include",
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
    },
    {
      select: ({ projects }) => {
        projects = projects.reduce((acc, project) => {
          const teacherName = project.teacherDetails.name;
          const projectName = project.name;
          const projectId = project._id;

          if (acc[teacherName]) {
            acc[teacherName].projects.push({ projectName, projectId });
          } else {
            acc[teacherName] = {
              teacherName,
              projects: [{ projectName, projectId }],
            };
          }
          return acc;
        }, {});
        return Object.values(projects);
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
  const renderOptions = () => {
    const { teacherName } = formData;
    let projects = data.filter((project) => {
      if (project.teacherName == teacherName) {
        return true;
      }
    })[0];
    projects = projects.projects;
    return projects.map((project) => {
      return (
        <option
          key={project.projectName}
          className={styled["form-option"]}
          value={project.projectId}
        >
          {project.projectName}
        </option>
      );
    });
  };

  return (
    <div className={styled["apply-container"]}>
      <form className={styled["form"]} onSubmit={(e) => onSubmitHandler(e)}>
        {error2 && <div className={styled["warning"]}>{error2.message}</div>}
        {data2 && <div className={styled["success"]}>{data2.message}</div>}
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
            const { teacherName } = project;
            return (
              <option
                key={teacherName}
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
          onChange={(e) => changeFormData("projectId", e.target.value)}
        >
          <option
            disabled
            key="placeholder"
            className={styled["form-option"]}
            value=""
            selected={formData.projectId == ""}
          >
            Choose a Project.
          </option>
          {formData.teacherName && renderOptions()}
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
