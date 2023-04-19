import React, { useState } from "react";
import styled from "./FacultyAllResponse.module.css";
import { useQuery, useMutation } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import client from "../../queryClient";

const FacultyAllResponse = ({ id, typeId }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingResponse, setLoadingResponse] = useState(null);

  const { data, error, isLoading, isError } = useQuery(
    "teacher-all-response-teacher-all-projects",
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
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useQuery(
    ["teacher-all-repsonse-projects", selectedProject],
    async () => {
      try {
        let allResponses = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI + "api/general/getAllResponse/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ projectId: selectedProject }),
          }
        );
        const data = await allResponses.json();
        if (allResponses.status == 500) {
          throw { message: data.message };
        }
        return data;
      } catch (error) {
        throw { message: error.message };
      }
    },
    {
      enabled: selectedProject != null,
    }
  );

  const {
    mutate,
    data: data3,
    isLoading: isLoading3,
    error: error3,
  } = useMutation(
    async (data) => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI + "api/teacher/reviewApplication",
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
          throw { message: data.message };
        }
        return responseData;
      } catch (error) {
        throw { message: error.message };
      }
    },
    {
      onSettled: () => {
        client.invalidateQueries([
          "teacher-all-repsonse-projects",
          selectedProject,
        ]);
      },
    }
  );

  const handleFormChange = (projectId) => {
    setSelectedProject(projectId);
  };

  const toggleResponseHandler = (responseId) => {
    if (isLoading3) {
      return;
    }
    setLoadingResponse(responseId);
    mutate({ responseId });
  };

  const fetchResponses = () => {
    if (selectedProject == null) {
      return null;
    }
    if (isLoading2) {
      return (
        <div className={styled["loading-container"]}>
          <Loading />
        </div>
      );
    }
    if (error2) {
      return (
        <div className={styled["error-container"]}>
          <Error message={error2.message} />
        </div>
      );
    }

    if (data2 && data2.responses.length == 0) {
      return <h1 className={styled["message"]}>No Responses Yet.</h1>;
    }

    return (
      <table className={styled["table"]}>
        <thead className={styled["table-headings"]}>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>College</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Status (Click to toggle)</th>
          </tr>
        </thead>
        {data2 && (
          <tbody className={styled["table-entries"]}>
            {data2.responses.map((response, index) => {
              const { name, year, branch, college } = response.studentDetails;
              const { responseStatus } = response;
              return (
                <tr key={response._id} className={styled["table-entry"]}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{college}</td>
                  <td>{branch}</td>
                  <td>{year}</td>
                  {isLoading3 && loadingResponse == response._id ? (
                    <td className={styled["status-loading"]}>
                      <span>Loading...</span>
                    </td>
                  ) : responseStatus == true ? (
                    <td className={styled["status-true"]}>
                      <span onClick={() => toggleResponseHandler(response._id)}>
                        {" "}
                        Approved
                      </span>
                    </td>
                  ) : (
                    <td className={styled["status-false"]}>
                      <span onClick={() => toggleResponseHandler(response._id)}>
                        {" "}
                        Waiting{" "}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    );
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
    <div className={styled["all-repsonse-parent"]}>
      {data && data.projects.length == 0 ? (
        <h1 className={styled["message"]}>No projects yet.</h1>
      ) : (
        <form className={styled["form"]}>
          <select
            disabled={isLoading || isLoading2}
            className={styled["form-select"]}
            onChange={(e) => handleFormChange(e.target.value)}
          >
            <option
              disabled
              key="placeholder"
              className={styled["form-option"]}
              value=""
              selected={!selectedProject}
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
        </form>
      )}
      {fetchResponses()}
    </div>
  );
};

export default FacultyAllResponse;
