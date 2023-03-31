import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

function IsLoggedIn({ component: Component  }) {
  
  const session = JSON.parse(localStorage.getItem("session"));
  const navigate = useNavigate();


  useEffect(() => {
    if (session != null) {
      const { role, userId } = session;
      let link = `/accounts/`;
      if (role === "student") {
        link = link + `student/home/${userId}`;
      } else if (role === "teacher") {
        link = link + `faculty/home/${userId}`;
      } else if (role === "admin") {
        link = link + `admin/home/${userId}`;
      }
      navigate(link, { replace: true });
    }
  }, [session ,navigate]);



  return <Component/>
}

export default IsLoggedIn;
