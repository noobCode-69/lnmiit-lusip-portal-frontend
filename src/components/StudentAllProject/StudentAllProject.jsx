import React from "react";
import styled from "./StudentAllProject.module.css";
import { useQuery } from "react-query";

import Loading from "../Loading/Loading";
import Error from "../Error/Error";
const StudentAllProject = () => {


  const { data, error, isLoading, isError } = useQuery(
    "all-projects",
    async () => {
      try {
        let allProjects = await fetch(
          "http://localhost:3000/general/getAllProjects/", {
            credentials : "include"
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
      {data.projects && data.projects.length == 0 ? (
        <h1 style={{textAlign : "center"}} className={styled["message"]}>No Projects Yet.</h1>
      ) : (
        <table className={styled["table"]}>
          <thead className={styled["table-headings"]}>
            <tr>
              <th>Sr. No</th>
              <th>Project Title</th>
              <th>Faculty</th>
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
                  <tr key={project._id} className={styled["table-entry"]}>
                    <td>{index+1}</td>
                    <td>{project.name}</td>
                    <td>{project.teacherDetails.name}</td>
                    <td className={styled["grow-downward"]}>
                      {project.description}
                    </td>
                    <td>{project.modeOfExecution}</td>
                    <td>{project.prerequists}</td>
                    <td>{project.validBranch}</td>
                    <td>{project.validYear.join(" and ")}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default StudentAllProject;

/**
 *
 *
 * 1) sidebar => accn to link we have to do make focus
 * 2)
 *
 *
 *
 * login => backend me jaa ke token genrate mongodb save =>
 * frontend me aake => username , email , save kar liya
 * token => username , email     , session
 *
 * protected route => username , email frontend se liya =>
 * backend me verify kiya ke email , username ka role hai ki nahi
 *
 * agar hai => to continue
 * agar nahi to logout
 *
 *
 *
 * login,signup , home => check karo emiail , username hai ki nahi => agar nahi to login
 * agar hia to validate => agar nahi => to login
 * => continue
 *
 */

// {_id: '641f6ba9095d56606f758e30', name: 'project1', description: 'project1 description', modeOfExecution: 'Offline', prerequists: 'None', …}1: {_id: '641f6bd6095d56606f758e35', name: 'project2', description: 'project2 description', modeOfExecution: 'Offline', prerequists: 'Web', …}length: 2[[Prototype]]: Array(0)[[Prototype]]: Object

// description
// :
// "project1 description"
// modeOfExecution
// :
// "Offline"
// name
// :
// "project1"
// prerequists
// :
// "None"
// teacherDetails
// :
// {_id: '641f67c6d603e773091bc362', department: 'CSE', designation: 'HOD', name: 'pretty', userId: '641f66efd603e773091bc35a'}
// validBranch
// :
// "CSE and ME"
// validYear
// :
// ['1st Year']
