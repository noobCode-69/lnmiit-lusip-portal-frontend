import React from "react";
import styled from "./StudentLayout.module.css";
import { useParams } from "react-router";

import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const StudentNavigationLinks = [
  {
    to: "/accounts/student/home",
    text: "Home",
  },
  {
    to: "/accounts/student/apply",
    text: "Apply",
  },
];

const StudentLayout = (Component) => {

  return (props) => {
    const studentId = useParams().studentId;
    const links = StudentNavigationLinks.map((link) => {
      return { ...link, to: `${link.to}/${studentId}` };
    });
    const name = "MD";
    const email = "armanyppph@gmail.com";
    return (
      <div className={styled["layout"]}>
        <Sidebar links={links} id={studentId} />
        <div className={styled["right-component"]}>
          <Navbar name={email} />
          <div className={styled["main-parent"]}>
              <div className={styled["greeting-message"]}>
                <h1>Welcome back, <span style={{fontWeight : "bold"}}>{name}</span> </h1>
              </div>
            <div className={styled["main-content"]}>
              <Component id={studentId}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default StudentLayout;
