import React, { useState } from "react";
import "../../index.css";
import { useContextState } from "../../context/userProvider";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const { baseURL } = useContextState();
  const navigate = useNavigate();

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setIsLoadingEmail(true);
    try {
      const response = await fetch(`https://group7-osp-forked.onrender.com/api/passwordreset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Password reset link sent to ${email}`);
        setOtpSent(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("There was an error sending the OTP. Please try again.");
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setIsLoadingOtp(true);
    try {
      const response = await fetch(` https://group7-osp-forked.onrender.com/api/passwordreset/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          email: email,
        }),
      });

     

      if (response.ok) {
        alert("OTP verified successfully");
        setOtpVerified(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("There was an error verifying the OTP. Please try again.");
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    setIsLoadingPassword(true);
    try {
      const response = await fetch(
        `https://group7-osp-forked.onrender.com/api/passwordreset/setnewpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Password updated successfully");

        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
        setOtpVerified(false);
        navigate("/");
      } else {
        alert("There was an error updating your password. Please try again.");
      }
    } catch (err) {
      console.error("Error setting password:", err);
      alert("There was an error updating your password. Please try again.");
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-black via-blue-800 to-blue-600 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-lg p-8 border border-white/20">
        <h2 className="text-4xl font-bold text-white mt-2 mb-6 text-center drop-shadow-sm animate-fade-in">
          Forgot Password
        </h2>

        {!otpSent && !otpVerified && (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/90">Email</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingEmail}
              className="w-full py-2.5 bg-slate-800 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              {isLoadingEmail ? "Sending..." : "Send Password Reset Link"}
            </button>
          </form>
        )}

        {otpSent && !otpVerified && (
          <form onSubmit={handleOtpVerification} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/90">OTP</label>
              <input
                type="text"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingOtp}
              className="w-full py-2.5 bg-slate-800 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              {isLoadingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {otpVerified && (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/90">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/90">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingPassword}
              className="w-full py-2.5 bg-slate-800 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
            >
              {isLoadingPassword ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
