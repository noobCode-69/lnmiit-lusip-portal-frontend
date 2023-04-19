import React, { useState } from "react";
import styled from "./FacultyAddProject.module.css";

import { useMutation } from "react-query";

const Years = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Open for all",
];
const Modes = ["Online", "Offline", "Either"];

const FacultyAddProject = ({ id, typeId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teacherId: typeId,
    modeOfExecution: "",
    validYear: [],
    validBranch: "",
    prerequists: "",
    isValid: false,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    console.log(formData);

    const {
      name,
      description,
      teacherId,
      modeOfExecution,
      validYear,
      validBranch,
      prerequists,
    } = formData;
    setFormData({
      name: "",
      description: "",
      teacherId: typeId,
      modeOfExecution: "",
      validYear: [],
      validBranch: "",
      prerequists: "",
      isValid: false,
    });
    mutate({
      name,
      description,
      teacherId,
      modeOfExecution,
      validYear,
      validBranch,
      prerequists,
    });
  };

  const { mutate, data, isLoading, error } = useMutation(async (data) => {
    try {
      let response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URI + "api/teacher/addProject",
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
        newFormData.name !== "" &&
        newFormData.description !== "" &&
        newFormData.teacherId != "" &&
        newFormData.modeOfExecution != "" &&
        newFormData.validBranch != "" &&
        newFormData.prerequists != "" &&
        newFormData.validYear.length != 0;
      return { ...newFormData, isValid: isValid };
    });
  }

  return (
    <div className={styled["add-container"]}>
      <form className={styled["form"]} onSubmit={(e) => onSubmitHandler(e)}>
        {error && <div className={styled["warning"]}>{error.message}</div>}
        {data && <div className={styled["success"]}>{data.message}</div>}

        <input
          placeholder="Name"
          className={styled["form-input"]}
          disabled={isLoading}
          type="text"
          onChange={(e) => changeFormData("name", e.target.value)}
          value={formData.name}
        />

        <input
          placeholder="Description"
          className={styled["form-input"]}
          disabled={isLoading}
          type="text"
          onChange={(e) => changeFormData("description", e.target.value)}
          value={formData.description}
        />

        <input
          placeholder="Branch"
          className={styled["form-input"]}
          disabled={isLoading}
          type="text"
          onChange={(e) => changeFormData("validBranch", e.target.value)}
          value={formData.validBranch}
        />

        <input
          placeholder="Prerequists"
          className={styled["form-input"]}
          disabled={isLoading}
          type="text"
          onChange={(e) => changeFormData("prerequists", e.target.value)}
          value={formData.prerequists}
        />

        <select
          disabled={isLoading}
          className={styled["form-select"]}
          onChange={(e) => changeFormData("modeOfExecution", e.target.value)}
        >
          <option
            disabled
            key="placeholder"
            className={styled["form-option"]}
            value=""
            selected={formData.modeOfExecution == ""}
          >
            Modes
          </option>
          {Modes.map((mode) => {
            return (
              <option key={mode} className={styled["form-option"]} value={mode}>
                {mode}
              </option>
            );
          })}
        </select>
        <select
          disabled={isLoading}
          multiple
          className={styled["form-select"]}
          onChange={(event) =>
            changeFormData(
              "validYear",
              Array.from(event.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option
            disabled
            key="placeholder"
            className={styled["form-option"]}
            value=""
          >
            Ctrl + Click for multiple selection
          </option>

          {Years.map((year) => (
            <option key={year} className={styled["form-option"]} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          className={styled["submit-button"]}
          disabled={isLoading || !formData.isValid}
          type="submit"
        >
          {!isLoading ? "Submit" : "Loading..."}
        </button>
      </form>
    </div>
  );
};

export default FacultyAddProject;
