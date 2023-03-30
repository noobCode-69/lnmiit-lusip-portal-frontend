import React, { useState } from "react";
import styled from "./FacultyAllResponse.module.css";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const FacultyAllResponse = ({ id }) => {
  const [open, setOpen] = useState(null);

  const { data, error, isLoading, isError } = useQuery(
    "teacher-all-projects",
    async () => {
      try {
        let allProjects = await fetch(
          "http://localhost:3000/teacher/getAllProjects/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacherId: id }),
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
    isError: isError2,
  } = useQuery(
    ["projects", open],
    async () => {
      try {
        let allResponses = await fetch(
          "http://localhost:3000/general/getAllResponse/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ projectId: open }),
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
      enabled: open != null,
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

  const toggleHandler = (projectId) => {
    if (open == projectId) {
      setOpen(null);
    } else {
      setOpen(projectId);
    }
  };

  const fetchResponses = () => {
    if (open == null) {
      return null;
    }
    if (isLoading2) {
      return (
        <div className={styled["loading-container"]}>
          <Loading />
        </div>
      );
    }
    if (isError2) {
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
      <table style={{ marginLeft: 0 }} className={styled["table"]}>
        <thead className={styled["table-headings"]}>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>College</th>
            <th>Branch</th>
            <th>Year</th>
            <th> Status</th>
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
                  {responseStatus == true ? (
                    <td className={styled["status-true"]}>
                      <span> Already Approved</span>
                    </td>
                  ) : (
                    <td className={styled["status-false"]}>
                      <span>Approve Student</span>
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

  return (
    <div className={styled["all-projects-parent"]}>
      {data && data.projects.length == 0 ? (
        <h1 style={{textAlign : "center"}} className={styled["message"]}>No Projects Yet.</h1>
      ) : (
        <table className={styled["table"]}>
          <thead className={styled["table-headings"]}>
            <tr>
              <th>Sr. No</th>
              <th>Project Title</th>
              <th>Project Description</th>
              <th>Mode of Execution</th>
              <th>Prerequisites</th>
              <th>Preferred Branch</th>
              <th>Preferred Year</th>
              <th>Response</th>
            </tr>
          </thead>
          {data && (
            <tbody className={styled["table-entries"]}>
              {data.projects.map((project, index) => {
                return (
                  <>
                    <tr key={project._id} className={styled["table-entry"]}>
                      <td>{index + 1}</td>
                      <td>{project.name}</td>
                      <td className={styled["grow-downward"]}>
                        {project.description}
                      </td>
                      <td>{project.modeOfExecution}</td>
                      <td>{project.prerequists}</td>
                      <td>{project.validBranch}</td>
                      <td>{project.validYear.join(" and ")}</td>
                      <td onClick={() => toggleHandler(project._id)}>
                        {open != project._id ? (
                          <div className={styled["open-close"]}>
                            <svg
                              width="24"
                              height="24"
                              xmlns="http://www.w3.org/2000/svg"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            >
                              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z" />
                            </svg>
                            OPEN
                          </div>
                        ) : (
                          <div className={styled["open-close"]}>
                            <svg
                              width="24"
                              height="24"
                              xmlns="http://www.w3.org/2000/svg"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            >
                              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 15l-5.247-6.44-5.263 6.44-.737-.678 6-7.322 6 7.335-.753.665z" />
                            </svg>
                            CLOSE
                          </div>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          )}
        </table>
      )}

      {fetchResponses()}
    </div>
  );
};

export default FacultyAllResponse;
