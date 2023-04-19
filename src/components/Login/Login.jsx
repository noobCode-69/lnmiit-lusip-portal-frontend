import React, { useEffect, useState } from "react";
import logo2 from "../../assets/logo_black.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "./Login.module.css";
import { useMutation } from "react-query";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isValid: false,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.isValid) {
      return;
    }
    const { email, password } = formData;
    setFormData({ email: "", password: "", isValid: false });
    mutate({ email, password });
  };

  const { data, mutate, isLoading, error } = useMutation(async (data) => {
    try {
      let response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URI + "api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
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

  useEffect(() => {
    if (data) {
      if (error) {
        return;
      }
      const { role, userId, name, email, typeId } = data.sessionData;
      let session = JSON.stringify({ name, role, email, userId, typeId });
      localStorage.setItem("session", session);
      let link = `/accounts/`;
      if (role == "student") {
        link = link + `student/home/${userId}`;
      } else if (role == "teacher") {
        link = link + `faculty/home/${userId}`;
      } else if (role == "admin") {
        link = link + `admin/home/${userId}`;
      }
      navigate(link, { replace: true });
    }
  }, [data]);

  return (
    <div className={styled["login"]}>
      <div className={styled["nav"]}>
        <div className={styled["nav-content"]}>
          <div className={styled["logo-container"]}>
            <Link to="/">
              <img src={logo2} />
            </Link>
          </div>
          <div className={styled["signup"]}>
            <Link to="/accounts/signup">Signup</Link>
          </div>
        </div>
      </div>

      <div className={styled["content"]}>
        <div className={styled["info"]}>
          <h1>LOGIN</h1>
          <p>Welcome back</p>
        </div>
        <form className={styled["form"]} onSubmit={(e) => onSubmitHandler(e)}>
          {error && <div className={styled["warning"]}>{error.message}</div>}
          {data && <div className={styled["success"]}>{data.message}</div>}
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

          <button
            className={styled["submit-button"]}
            disabled={isLoading || !formData.isValid}
            type="submit"
          >
            {!isLoading ? "Submit" : "Loading..."}
          </button>
        </form>
        <div className={styled["link-container"]}>
          Don't have an account <Link to="/accounts/signup"> Sign up</Link>
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

export default Login;
