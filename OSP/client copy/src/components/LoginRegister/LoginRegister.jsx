import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContextState } from "../../context/userProvider";
import "../../index.css";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./Group1.png"
const images = ["/image1.png", "/image2.png", "/image3.png", "/image4.png"];
var endpoint = "https://group7-osp-forked.onrender.com";

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [selectedRole, setSelectedRole] = useState("student");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser, baseURL } = useContextState();

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
        localStorage.setItem("roleChecked", "true");

        if (check.role === "student") {
          navigate("/student");
        } else if (check.role === "admin") {
          navigate("/admin");
        }
      } else {
        localStorage.removeItem("userInfo");
        toast.error("Session expired, please log in again.");
      }
    } catch (err) {
      toast.error("Unexpected Error. Please login again.");
    }
  };

  const toggleForm = () => {
    refreshCaptcha();
    setIsRegistering(!isRegistering);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (captchaInput !== captcha) {
      toast.error("Enter valid Captcha");
      return;
    }

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
      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        
        setUser(data);
        
        if (data.role === "student") {
          localStorage.setItem("roleChecked_student", "true");
          navigate("/student");
        } else if (data.role === "admin") {
          localStorage.setItem("roleChecked", "true");
          navigate("/admin");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
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
        toast.success("Registration successful!\n Please log in.");
        toggleForm();
      } else {
        toast.error("Registration failed: " + data.message);
      }
    } catch (error) {
      // console.error("Registration error:", error);
      toast.error("An error occurred while registering.");
    }
  };

  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        limit={2}
        newestOnTop={true}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="p-8 bg-gradient-to-br from-black via-blue-800 to-blue-600 min-h-screen flex items-center justify-center">
        {/* <ImageCarousel images={images} /> */}
        <div className="w-full max-w-md bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-lg p-8 border border-white/20">
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className=" w-24 h-28 object-contain animate-pulse-grow"
            />
            <div className="text-7xl text-[#000080] font-extrabold drop-shadow-sm animate-fade-in">
              OSP
            </div>
          </div>

          {/* Form Title with Animation */}
          <h3 className="text-4xl font-bold text-white mt-2 mb-2 text-center drop-shadow-sm animate-fade-in">
            {isRegistering ? "Register" : "Login"}
          </h3>
          <form
            className="space-y-6"
            onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}
          >
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-white/90">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2.5 bg-slate-8000 backdrop-blur-sm rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-white/90">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-white/70 cursor-pointer">
                  <span onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </span>
              </div>
            </div>
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={selectedRole === "student"}
                      onChange={() => setSelectedRole("student")}
                      className="hidden peer"
                    />
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 peer-checked:border-white peer-checked:bg-white transition-colors duration-300"></span>
                    <span className="text-white">Student</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={selectedRole === "admin"}
                      onChange={() => setSelectedRole("admin")}
                      className="hidden peer"
                    />
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 peer-checked:border-white peer-checked:bg-white transition-colors duration-300"></span>
                    <span className="text-white">Admin</span>
                  </label>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="px-4 py-2 bg-slate-800 backdrop-blur-sm text-white rounded-lg font-bold">
                  {captcha}
                </span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="px-2 py-1 text-sm text-white bg-slate-800 backdrop-blur-sm rounded-lg hover:bg-white/20"
                >
                  Refresh
                </button>
                <input
                  type="number"
                  value={captchaInput}
                  required
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter the captcha"
                  className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-800 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <div className="flex flex-col items-center justify-center space-y-4">
            <div
              onClick={toggleForm}
              className="flex items-center pt-2 space-x-2 text-white font-semibold cursor-pointer hover:underline"
            >
              <p className="text-center text-lg text-white/90">
                {isRegistering
                  ? "Already have an account? "
                  : "Don't have an account? "}
              </p>
              <span className="text-lg">
                {isRegistering ? " Login" : " Register"}
              </span>
            </div>

            {!isRegistering && (
              <div className="text-white font-semibold cursor-pointer hover:underline">
                <Link to="/forgot-password"><span>Forgot/Change Password</span></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginRegister;
