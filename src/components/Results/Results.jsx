import React from "react";
import styled from "./Results.module.css";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useQuery } from "react-query";

const Results = () => {
  const { data, error, isLoading, isError } = useQuery(
    "results-data",
    async () => {
      try {
        let report = await fetch("http://localhost:3000/general/getReport/", {
          credentials: "include",
        });
        const data = await report.json();
        if (report.status == 500) {
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
  } = useQuery("results-registration-status", async () => {
    try {
      let status = await fetch(
        "http://localhost:3000/general/getRegistrationStatus/",
        {
          credentials: "include",
        }
      );
      const data = await status.json();
      if (status.status == 500) {
        throw { message: data.message };
      }
      return data;
    } catch (error) {
      throw { message: error.message };
    }
  });

  if (isLoading || isLoading2) {
    return (
      <div className={styled["loading-container"]}>
        <Loading />
      </div>
    );
  }

  if (isError || isError2) {
    if (isError) {
      return (
        <div className={styled["error-container"]}>
          <Error message={error.message} />
        </div>
      );
    }
    return (
      <div className={styled["error-container"]}>
        <Error message={error2.message} />
      </div>
    );
  }

  if (data && data2) {
    console.log(data, data2);
  }

  return (
    <div className={styled["report-parent"]}>
      <div className={styled["content"]}>
        <div className={styled["message"]}>
          {data2.status == true ? (
            <div>
              Registrations are still going on, this list will update time to
              time.
            </div>
          ) : (
            <div>Registrations are close , this is the final list.</div>
          )}
        </div>
        <div className={styled['download']}>
            <div className={styled['button']}>DOWNLOAD</div>
        </div>


        {data && data.responses && data.responses.length == 0 ? (
        <h1 style={{textAlign : "center"}} className={styled["message"]}>No Projects Yet.</h1>
      ) : (
        <table className={styled["table"]}>
          <thead className={styled["table-headings"]}>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>College</th>
              <th>Mode of Execution</th>
              <th>Project Title</th>
              <th>Project Instructor</th>
              <th>Status</th>
            </tr>
          </thead>
          {data && (
            <tbody className={styled["table-entries"]}>
              {data.responses.map((response, index) => {
                const {studentDetails , projectDetails } = response;
                const {teacherDetails} = projectDetails
                return (
                  <tr key={response._id} className={styled["table-entry"]}>
                    <td>{index+1}</td>
                    <td>{studentDetails.name}</td>
                    <td>{studentDetails.college}</td>
                    <td >
                      {projectDetails.modeOfExecution}
                    </td>
                    <td>{projectDetails.name}</td>
                    <td>{teacherDetails.name}</td>
                    {
                        response.responseStatus == true ? (
                            <td className={styled["status-true"]}>
                              <span>
                                Approved
                              </span>
                            </td>
                          ) : (
                            <td className={styled["status-false"]}>
                              <span >
                                Waiting
                              </span>
                            </td>
                          )
                    }
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      )}

      </div>
    </div>
  );
};

export default Results;
