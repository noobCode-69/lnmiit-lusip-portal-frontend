import React from "react";
import styled from "./AdminLayout.module.css";
import { useParams } from "react-router";

import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import AdminNavigationLinks from "./AdminLayout.config";

const AdminLayout = (Component) => {

  return (props) => {
    const adminId = useParams().adminId;
    const links = AdminNavigationLinks.map((link) => {
      return { ...link, to: `${link.to}/${adminId}` };
    });
    const name = "Sandeep";
    const email = "sandeep@gmail.com";
    return (
      <div className={styled["layout"]}>
        <Sidebar links={links} id={adminId} />
        <div className={styled["right-component"]}>
          <Navbar name={email} />
          <div className={styled["main-parent"]}>
              <div className={styled["greeting-message"]}>
                <h1>Welcome back, <span style={{fontWeight : "bold"}}>{name}</span> </h1>
              </div>
            <div className={styled["main-content"]}>
              <Component id={adminId}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default AdminLayout;
