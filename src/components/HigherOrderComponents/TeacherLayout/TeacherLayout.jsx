import React from "react";
import styled from "./TeacherLayout.module.css";
import { useParams } from "react-router";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import TeacherNavigationLinks from "./TeacherLayout.config";

const StudentLayout = (Component) => {

  return (props) => {
    const id = useParams().facultyId;
    const links = TeacherNavigationLinks.map((link) => {
      return { ...link, to: `${link.to}/${id}` };
    });
    const {name , email , typeId} = JSON.parse(localStorage.getItem('session'))
    return (
      <div className={styled["layout"]}>
        <Sidebar links={links} id={id} />
        <div className={styled["right-component"]}>
          <Navbar name={email} />
          <div className={styled["main-parent"]}>
              <div className={styled["greeting-message"]}>
                <h1>Welcome back, <span style={{fontWeight : "bold"}}>{name}</span> </h1>
              </div>
            <div className={styled["main-content"]}>
              <Component id={id} typeId={typeId}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default StudentLayout;
