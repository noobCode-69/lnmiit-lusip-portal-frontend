import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import styled from "./Sidebar.module.css";

const Sidebar = ({ links, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    const { token } = JSON.parse(localStorage.getItem("session"));
    await mutate({ token: token });
    localStorage.removeItem("session");
    navigate("/accounts/login", { replace: true });
  };

  const { mutate } = useMutation(async (data) => {
    try {
      let response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URI + "api/user/logout",
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

  return (
    <div className={styled["sidebar"]}>
      <div className={styled["logo"]}>
        <div className={styled["img-container"]}>
          <img src={logo} />
        </div>
      </div>
      <div className={styled["links"]}>
        {links.map((link) => {
          return (
            <div
              key={link.text}
              className={`${
                link.to == location.pathname ? styled["active"] : ""
              }   ${styled["link"]}`}
            >
              <Link to={link.to}>{link.text}</Link>
            </div>
          );
        })}
      </div>
      <div className={`${styled["logout"]}`}>
        <div className={`${styled["link"]}`}>
          <Link onClick={handleLogout} to={"#"}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
