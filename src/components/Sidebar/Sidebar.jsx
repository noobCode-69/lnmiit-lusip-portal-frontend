import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styled from "./Sidebar.module.css";

const Sidebar = ({ links, id }) => {
    const location = useLocation();
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
            <div key={link.text} className={`${link.to==location.pathname ? styled['active'] : ""}   ${styled["link"]}`}>
              <Link to={link.to}>{link.text}</Link>
            </div>
          );
        })}
      </div>
      <div className={`${styled["logout"]}`}>
        <div className={`${styled["link"]}`}>
          <Link to={"#"}>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
