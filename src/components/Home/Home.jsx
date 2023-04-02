import React from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo_black.png";

import { Link } from "react-router-dom";
import styled from "./Home.module.css";

const instructions = [
  "The project duration is 2 months.",
  "The project will be open for everyone in the world, if he/she fulfills the prerequisites.",
  "A student can register for only one project and he/she can give two choices according to his/her priority.",
  "Most of the projects would require the students to be present on campus for the entire project duration.",
  "All the communications between a supervisor and the students will be through various online mechanisms being used on the campus.",
  "There is no registration fee for the student.",
  "The participants have to pay the hostel and mess fee for campus accomodation.",
  "Hostel charges for the external students will be Rs 15,000 for 2 months",
  "Mess charges for the external students will be Rs 8,000 for 2 months duration.",
  "Students will not get any stipend for the program until the project description mentions it.",
  "The students will receive the certificate on successful completion of the project, which is entirely decided by the supervisor's satisfaction.",
  "The LNMIIT students will only pay for the Internet, electricity and mess charges as per the notification sent by the chief warden.",
  "Outside LNMIIT students who will come to the campus for offline projects, will have to pay hostel and mess fee for 2 months in advance.",
  "Accomodation and mess charges will be updated quite soon",
  "Selected students should pay this amount Via NEFT. The details of bank account will be shared with them.",
];

const Home = () => {



  return (
    <div className={"home"}>
      <div className={styled["hero-parent"]}>
        <div className={styled["hero"]}>
          <div className={styled["nav"]}>
            <div className={styled["logo-container"]}>
              <Link to="/">
                <img src={logo} />
              </Link>
            </div>
            <div className={styled["login-link"]}>
              <Link to="/accounts/login">LOGIN</Link>
            </div>
          </div>
          <div className={styled["hero-banner"]}>
            <div className={styled["banner-highlight"]}>
              <span className={styled["one"]}> # </span> Start Your Journey to
              Growth: Join LNMIIT's LUSIP Summer Intern Program Today
            </div>

            <h1 className={styled["banner-heading"]}>
              The LNM Institute of Information Technology , Undergraduate Summer
              Internship Program.
            </h1>
            <div className={styled["banner-links"]}>
              <Link className={styled["banner-link"]} to="/accounts/login">
                PROJECTS
              </Link>
              <Link className={styled["banner-link"]} to="/accounts/results">
                RESULTS
              </Link>
            </div>
          </div>
          <ul className={styled["hero-info-list"]}>
            <li className={styled["hero-info-list-item"]}>
              {" "}
              LUSIP announces its 11th edition for the year 2023.
            </li>
            <li className={styled["hero-info-list-item"]}>
              LUSIP offers you an invaluable platform to engage in cutting edge
              research and challenging projects with the esteemed faculty and
              mentors of The LNM Institute of Information Technology. It is a
              unique opportunity to gain practical experience and insight into
              professional life. In all, it is the best way for you to get a
              hands-on experience of the opportunities available in your area of
              interest.
            </li>
            <li className={styled["hero-info-list-item"]}>
              The program is available to all undergraduate students across the
              world. The projects are mostly offered in offline mode and only a
              few are offered in online mode. The selected students should come
              to the LNMIIT campus and work for the project duration under the
              supervision of the faculty mentors.
            </li>
          </ul>
        </div>
      </div>
      <div className={styled["instructions-parent"]}>
        <div className={styled["instruction-left"]}>
          <h1>
            <span className={styled["highlight"]}> Instruction,</span> <br />{" "}
            Guidelines for Students.
          </h1>
          <p>
            We encourage all students to familiarize themselves with the
            following guidelines:
          </p>
        </div>
        <ul className={styled["instruction-right-list"]}>
          {instructions.map((instruction,index) => {
            return (
              <li key={index} className={styled["instruction-right-list-item"]}>
                {instruction}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styled["timeline-parent"]}>
        <div className={styled["timeline-info"]}>
          <h1>Timeline</h1>
        </div>
        <div className={styled["timelines"]}>
          <div className={styled["timeline"]}>
            <svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 0h-20v24h14l6-6v-18zm-6 18h4.36l-4.36 4.385v-4.385zm-3 1h-8v1h8v-1zm0-3h-8v1h8v-1zm6-2v-1h-14v1h14zm-7.059-4.968c-1.147-.265-2.214-.497-1.697-1.473 1.573-2.97.417-4.559-1.244-4.559-1.694 0-2.821 1.65-1.244 4.559.532.982-.575 1.214-1.697 1.473-1.024.237-1.062.745-1.059 1.635l.001.333h7.997l.001-.323c.004-.896-.03-1.407-1.058-1.645zm7.059.968h-4v1h4v-1zm0-2v-1h-4v1h4zm0-4h-4v1h4v-1z"/></svg>
            <h2>Student Application Opens</h2>
            <p>9th May 2022</p>
          </div>
          <div className={styled["arrow"]}></div>
          <div className={styled["timeline"]}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.825 12c-.228.59-3.052 6.998-3.772 8.614-.756 1.695-2.229 3.386-4.951 3.386h-4.729c-2.865 0-4.373-1.7-4.373-4.673v-12.975c0-1.721 2.37-1.633 2.37-.08v5.689c0 .468.858.465.858 0v-9.142c0-1.769 2.65-1.722 2.65 0v8.63c0 .476.797.456.797-.01v-10.128c0-1.722 2.624-1.773 2.624 0l.001 10.245c0 .459.826.469.826 0v-8.604c0-1.629 2.873-1.679 2.873 0v9.75c0 .597.587.692.811.236.212-.433 1.089-2.368 1.1-2.389.883-1.849 3.832-.726 2.915 1.451z"/></svg>
            <h2>Student Application Ends On </h2>
            <p>22nd May 2022</p>
          </div>
          <div className={styled["arrow"]}></div>

          <div className={styled["timeline"]}>
            <svg clip-rule="evenodd" fill-rule="evenodd" width="24" height="24" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-12.751 8.306c-.165-.147-.249-.351-.249-.556 0-.411.333-.746.748-.746.178 0 .355.062.499.19l2.371 2.011 4.453-4.962c.149-.161.35-.243.554-.243.417 0 .748.336.748.746 0 .179-.065.359-.196.503l-4.953 5.508c-.148.161-.35.243-.553.243-.177 0-.356-.063-.498-.19z" fill-rule="nonzero"/></svg>
            <h2>Results </h2>
            <p> 28th May 2022</p>
          </div>
          <div className={styled["arrow"]}></div>

          <div className={styled["timeline"]}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.566 17.842c-.945 2.462-3.678 4.012-6.563 4.161.139-2.772 1.684-5.608 4.209-6.563l.51.521c-1.534 1.523-2.061 2.765-2.144 3.461.704-.085 2.006-.608 3.483-2.096l.505.516zm-1.136-11.342c-1.778-.01-4.062.911-5.766 2.614-.65.649-1.222 1.408-1.664 2.258 1.538-1.163 3.228-1.485 5.147-.408.566-1.494 1.32-3.014 2.283-4.464zm5.204 17.5c.852-.44 1.61-1.013 2.261-1.664 1.708-1.706 2.622-4.001 2.604-5.782-1.575 1.03-3.125 1.772-4.466 2.296 1.077 1.92.764 3.614-.399 5.15zm11.312-23.956c-.428-.03-.848-.044-1.261-.044-9.338 0-14.465 7.426-16.101 13.009l4.428 4.428c5.78-1.855 12.988-6.777 12.988-15.993v-.059c-.002-.437-.019-.884-.054-1.341zm-5.946 7.956c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/></svg>
            <h2>Project Starts </h2>
            <p> 30th May 2022</p>
          </div>
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

export default Home;
