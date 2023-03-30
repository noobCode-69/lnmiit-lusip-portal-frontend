import React from "react";
import styled from "./TeacherLayout.module.css";
import { useParams } from "react-router";

import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import TeacherNavigationLinks from "./TeacherLayout.config";

const StudentLayout = (Component) => {

  return (props) => {
    const teacherId = useParams().facultyId;
    const links = TeacherNavigationLinks.map((link) => {
      return { ...link, to: `${link.to}/${teacherId}` };
    });
    const name = "Pretty";
    const email = "pretty@lnmiit.ac.in";
    return (
      <div className={styled["layout"]}>
        <Sidebar links={links} id={teacherId} />
        <div className={styled["right-component"]}>
          <Navbar name={email} />
          <div className={styled["main-parent"]}>
              <div className={styled["greeting-message"]}>
                <h1>Welcome back, <span style={{fontWeight : "bold"}}>{name}</span> </h1>
              </div>
            <div className={styled["main-content"]}>
              <Component id={teacherId}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default StudentLayout;
