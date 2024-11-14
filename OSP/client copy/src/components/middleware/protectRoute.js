import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useContextState } from "../../context/userProvider";

const PrivateRoute = ({ children }) => {
  const { user, baseURL } = useContextState();
  const navigate = useNavigate();

  const roleCheck = async (userInfo) => {
    try {
      const response = await fetch(`${baseURL}/api/user/authRole`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userInfo),
      });

      const check = await response.json();

      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(check));

        if (check.role === "admin") {
          // Allow access
          return true;
        } else {
          // Redirect if not an admin
          if(check.role === "student" && user){
            navigate("/student-dashboard")
          }
          navigate("/"); // Replace with your "Not Authorized" page if available
        }
      } else {
        localStorage.removeItem("userInfo");
        alert("Session expired, please log in again.");
        navigate("/");
      }
    } catch (err) {
      console.log("Unexpected Error. Please login again.");
      navigate("/");
    }
    return false;
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      roleCheck(userInfo);
    } else {
        console.log("You don't have permission to access")
      navigate("/"); 
    }
  }, [user, navigate]);

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
