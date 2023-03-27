import React, { useEffect, useState } from "react";
import logo2 from "../../assets/logo_black.png";
import { Link } from "react-router-dom";
import styled from "./Signup.module.css";

const Years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

const Signup = () => {

    
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    branch: "",
    year: "",
    college: "",
    isValid: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiFetch = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("error creating");
      }, 1000);
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    const { email, password, name, branch, year, college } = formData;
    console.log({ email, password, name, branch, year, college })
    setError(null);
    try {
      setIsLoading(true);
      setFormData({
        college: "",
        email: "",
        password: "",
        name: "",
        year: "",
        branch: "",
        isValid: false,
      });
      const data = await apiFetch();
      alert("new user created , now redirecting to");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  function changeFormData(fieldName, fieldValue) {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [fieldName]: fieldValue };
      const isValid =
        newFormData.email !== "" &&
        newFormData.password !== "" &&
        newFormData.name != "" &&
        newFormData.college != "" &&
        newFormData.branch != "" &&
        Years.includes(newFormData.year) &&
        checkValidEmail(newFormData.email);
      return { ...newFormData, isValid: isValid };
    });
  }

  return (
    <div className={styled["signup"]}>
      <div className={styled["nav"]}>
        <div className={styled["nav-content"]}>
          <div className={styled["logo-container"]}>
            <img src={logo2} />
          </div>
          <div className={styled["login"]}>
            <Link to="/accounts/login">Login</Link>
          </div>
        </div>
      </div>

      <div className={styled["content"]}>
        <div className={styled["info"]}>
          <h1>SIGNUP</h1>
          <p>Create account</p>
        </div>
        <form className={styled["form"]} onSubmit={(e) => onSubmitHandler(e)}>
          {error && <div className={styled["warning"]}>{error}</div>}

          <input
            placeholder="E-mail address"
            className={styled["form-input"]}
            disabled={isLoading}
            type="email"
            onChange={(e) => changeFormData("email", e.target.value)}
            value={formData.email}
          />

          <input
            placeholder="Password"
            className={styled["form-input"]}
            disabled={isLoading}
            type="password"
            onChange={(e) => changeFormData("password", e.target.value)}
            value={formData.password}
          />
          <input
            placeholder="Name"
            className={styled["form-input"]}
            disabled={isLoading}
            type="text"
            onChange={(e) => changeFormData("name", e.target.value)}
            value={formData.name}
          />

          <input
            placeholder="College"
            className={styled["form-input"]}
            disabled={isLoading}
            type="text"
            onChange={(e) => changeFormData("college", e.target.value)}
            value={formData.college}
          />

          <input
            placeholder="Branch"
            className={styled["form-input"]}
            disabled={isLoading}
            type="text"
            onChange={(e) => changeFormData("branch", e.target.value)}
            value={formData.branch}
          />

          <select className={styled['form-select']} onChange={(e) => changeFormData("year", e.target.value)}>
            {
                Years.map((year)=>{
                    return <option key={year} className={styled['form-option']} value={year}>{year}</option>
                })
            }
          </select>

          <button
            className={styled["submit-button"]}
            disabled={isLoading || !formData.isValid}
            type="submit"
          >
            {!isLoading ? "Submit" : "Loading..."}
          </button>
        </form>
        <div className={styled["link-container"]}>
          Already have an account <Link to="/accounts/login"> Login up</Link>
        </div>
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

export default Signup;
