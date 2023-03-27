import React, { useEffect, useState } from "react";
import logo2 from "../../assets/logo_black.png";
import { Link } from "react-router-dom";
import styled from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isValid: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiFetch = () => {
    // save cookie etc 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Wrong Credentails");
      }, 5000);
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    const { email, password } = formData;
    setError(null);
    try {
      setIsLoading(true);
      setFormData({ email: "", password: "", isValid: false });
      const data = await apiFetch();
      alert("welcome logged in , now redirecting to");
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
        checkValidEmail(newFormData.email);
      return { ...newFormData, isValid: isValid };
    });
  }

  return (
    <div className={styled["login"]}>
      <div className={styled["nav"]}>
        <div className={styled["nav-content"]}>
          <div className={styled["logo-container"]}>
            <img src={logo2} />
          </div>
          <div className={styled["signup"]}>
            <Link to="/accounts/signup">Signup</Link>
          </div>
        </div>
      </div>

      <div className={styled["content"]}>
        <div className={styled['info']}>
        <h1>LOGIN</h1>
        <p>Welcome back</p>
        </div>
        <form className={styled['form']} onSubmit={(e) => onSubmitHandler(e)}>
          {error && <div className={styled['warning']}>{error}</div>}
          <input
          placeholder="E-mail address"
          className={styled['form-input']}
            disabled={isLoading}
            type="email"
            onChange={(e) => changeFormData("email", e.target.value)}
            value={formData.email}
          />
          <input
          placeholder="Password"
          className={styled['form-input']}
            disabled={isLoading}
            type="password"
            onChange={(e) => changeFormData("password", e.target.value)}
            value={formData.password}
          />

          <button className={styled['submit-button']} disabled={isLoading || !formData.isValid} type="submit">
            {!isLoading ? "Submit" : "Loading..."}
          </button>
        </form>
        <div className={styled['link-container']}>
            Don't have an account <Link to="/accounts/signup">  Sign up</Link>
        </div>
      </div>

      <div className={styled['contact-parent']}>
          <div className={styled['contact-img-container']}>
            <img src={logo2}/>
          </div>
          <p>Feel free to contact us anytime, <br/>
          Send in your queries at   lusip@lnmiit.ac.in or sandeep.saini@lnmiit.ac.in</p>
          <p>©2023 LNMIIT. All rights reserved.</p>
    </div>
    </div>
  );
};

export default Login;
