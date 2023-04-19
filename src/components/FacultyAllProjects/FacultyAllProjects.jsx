import React, { useState } from "react";
import styled from "./FacultyAllProjects.module.css";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const FacultyAllProjects = ({ id, typeId }) => {
  const { data, error, isLoading, isError } = useQuery(
    "teacher-all-projects-teacher-all-projects",
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
    <div className={styled["all-projects-parent"]}>
      {data && data.projects.length == 0 ? (
        <h1 style={{ textAlign: "center" }} className={styled["message"]}>
          No Projects Yet.
        </h1>
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
                    </tr>
                  </>
                );
              })}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default FacultyAllProjects;
