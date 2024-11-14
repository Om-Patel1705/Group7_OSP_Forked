import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import logo from "../assets/img.jpeg";
import logodaiict from "../assets/imgdaiict.jpg";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios"; // For making HTTP requests
import { useContextState } from "../../context/userProvider";

var endpoint = "http://localhost:8080";

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For registration
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [selectedRole, setSelectedRole] = useState("student");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, baseURL } = useContextState();

  const navigate = useNavigate();


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      roleCheck(userInfo); 
    }
  }, [navigate]);

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
        
        
        if (check.role === "student") {
          navigate("/student-dashboard");
        } else if (check.role === "admin") {
          navigate("/admin");
        }
      } else {
        localStorage.removeItem("userInfo");
        alert("Session expired, please log in again.");
      }
    } catch (err) {
      console.log("Unexpected Error"+err);
    }
  };


  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

   const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    // console.log(selectedRole);
    try {
      const response = await fetch(`${baseURL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
          captcha: captchaInput,
        }),
      });

      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        
        if (data.role === "student") {
          navigate("/student-dashboard");
        } else if (data.role === "admin") {
          navigate("/admin");
        }
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        toggleForm();
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred while registering.");
    }
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  return (
    <div className="login-container">
      <div className="image-side">
        <img src={logo} alt="College Logo" className="logo-background" />
      </div>
      <div className="form-side">
        <div className="title-box"></div>

        <div className="form-container">
          <div className="osp-logo">
            <div className="osp-logo-o">
              <img
                src={logodaiict}
                alt="DAIICT Logo"
                className="osp-logo-image"
              />
            </div>
            <span className="osp-logo-text">SP</span>
          </div>

          <div className="form-box">
            {!isRegistering ? (
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FaUser className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FaLock className="icon" />
                  <span
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="captcha-box">
                  <span className="captcha-text">{captcha}</span>
                  <button
                    type="button"
                    className="refresh-captcha"
                    onClick={refreshCaptcha}
                  >
                    🔄
                  </button>
                  <input
                    type="text"
                    placeholder="Enter CAPTCHA"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                </div>
                <div className="role-selection">
                  <div className="input1-box">
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={selectedRole === "student"}
                        onChange={() => setSelectedRole("student")}
                      />
                      Student
                    </label>
                  </div>
                  <div className="input1-box">
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={selectedRole === "admin"}
                        onChange={() => setSelectedRole("admin")}
                      />
                      Admin
                    </label>
                  </div>
                </div>

                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a onClick={handleForgotPassword} >
                    Forgot Password?
                  </a>
                </div>
                <button type="submit">Login</button>
                <div className="toggle-link">
                  <p>
                    Don't have an account?{" "}
                    <span onClick={toggleForm}>Register</span>
                  </p>
                </div>
              </form>
            ) : (
              <form className="register-form" onSubmit={handleRegisterSubmit}>
                <h2>Sign Up</h2>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FaUser className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FaLock className="icon" />
                  <span
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type="submit">Register</button>
                <div className="toggle-link">
                  <p>
                    Already have an account?{" "}
                    <span onClick={toggleForm}>Login</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
