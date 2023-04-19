import React from "react";
import styled from "./Results.module.css";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import logo2 from "../../assets/logo_black.png";

import jsPDF from "jspdf";
import "jspdf-autotable";

const Results = () => {
  const { data, error, isLoading, isError } = useQuery(
    "results-data",
    async () => {
      try {
        let report = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URI + "api/general/getReport/",
          {
            credentials: "include",
          }
        );
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
        import.meta.env.VITE_BACKEND_BASE_URI +
          "api/general/getRegistrationStatus/",
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

  const handleDownload = () => {
    const array = [];

    data.responses.forEach((response, index) => {
      const { studentDetails, projectDetails } = response;
      const { teacherDetails } = projectDetails;

      const newArr = [
        index + 1,
        studentDetails.name,
        studentDetails.college,
        projectDetails.modeOfExecution,
        projectDetails.name,
        teacherDetails.name,
      ];

      if (response.responseStatus == true) {
        newArr.push("Approved");
      } else {
        newArr.push("Waiting");
      }

      array.push(newArr);
    });

    const doc = new jsPDF();

    const headers = [
      [
        "S no",
        "Name",
        "College",
        "Mode of Execution",
        "Project Title",
        "Project Instructor",
        "Status",
      ],
    ];

    doc.autoTable({
      head: headers,
      body: array,
      startY: 20,
      margin: { top: 20 },
      styles: {
        cellPadding: 4,
        lineWidth: 0.1,
        lineColor: [128, 128, 128],
      },
    });
    doc.save("data.pdf");
  };

  return (
    <div className={styled["report-parent"]}>
      <div className={styled["nav"]}>
        <div className={styled["nav-content"]}>
          <div className={styled["logo-container"]}>
            <Link to="/">
              <img src={logo2} />
            </Link>
          </div>
        </div>
      </div>

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
        <div className={styled["download"]}>
          <div onClick={handleDownload} className={styled["button"]}>
            DOWNLOAD
          </div>
        </div>

        {data && data.responses && data.responses.length == 0 ? (
          <h1 style={{ textAlign: "center" }} className={styled["message"]}>
            No Projects Yet.
          </h1>
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
                  const { studentDetails, projectDetails } = response;
                  const { teacherDetails } = projectDetails;
                  return (
                    <tr key={response._id} className={styled["table-entry"]}>
                      <td>{index + 1}</td>
                      <td>{studentDetails.name}</td>
                      <td>{studentDetails.college}</td>
                      <td>{projectDetails.modeOfExecution}</td>
                      <td>{projectDetails.name}</td>
                      <td>{teacherDetails.name}</td>
                      {response.responseStatus == true ? (
                        <td className={styled["status-true"]}>
                          <span>Approved</span>
                        </td>
                      ) : (
                        <td className={styled["status-false"]}>
                          <span>Waiting</span>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        )}
      </div>

      <div className={styled["contact-parent"]}>
        <div className={styled["contact-img-container"]}>
          <img src={logo2} />
        </div>
        <p>
          Feel free to contact us anytime, <br />
          Send in your queries at lusip@lnmiit.ac.in or
          sandeep.saini@lnmiit.ac.in
        </p>
        <p>©2023 LNMIIT. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Results;
