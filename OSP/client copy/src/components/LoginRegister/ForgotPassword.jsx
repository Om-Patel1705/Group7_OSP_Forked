import React, { useState } from 'react';
import './ForgotPassword.css';
import { useContextState } from "../../context/userProvider";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false); // Track if OTP was sent
    const [otpVerified, setOtpVerified] = useState(false); // Track if OTP was verified
    const [isLoadingEmail, setIsLoadingEmail] = useState(false); // Loading state for email form
    const [isLoadingOtp, setIsLoadingOtp] = useState(false); // Loading state for OTP form
    const [isLoadingPassword, setIsLoadingPassword] = useState(false); // Loading state for password form
    const { baseUrl } = useContextState();
    const navigate = useNavigate();

    // Handle email submit and call the API to send OTP
    const handlePasswordReset = async (event) => {
        event.preventDefault();
        setIsLoadingEmail(true); // Set loading state to true while request is in progress
        try {
            const response = await fetch(`http://localhost:8080/api/passwordreset/`, {
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
                // console.log(response);
                // console.log(data);
                // alert("There was an error sending the OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error sending OTP:", err);
            alert("There was an error sending the OTP. Please try again.");
        } finally {
            setIsLoadingEmail(false); // Reset loading state after request completes
        }
    };

    // Handle OTP verification
    const handleOtpVerification = async (event) => {
        event.preventDefault();
        setIsLoadingOtp(true); // Set loading state to true while request is in progress
        try {
            const response = await fetch(` http://localhost:8080/api/passwordreset/verify`, {
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
                // console.log(response);
                alert("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            alert("There was an error verifying the OTP. Please try again.");
        } finally {
            setIsLoadingOtp(false); // Reset loading state after request completes
        }
    };

    // Handle new password and confirm password form submit
    const handlePasswordChange = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }
        setIsLoadingPassword(true); // Set loading state to true while request is in progress
        try {
            const response = await fetch(` http://localhost:8080/api/passwordreset/setnewpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    newPassword: newPassword,
                }),
            });

            if (response.ok) {
                alert("Password updated successfully");
                // Redirect to login or clear the form
                setEmail('');
                setOtp('');
                setNewPassword('');
                setConfirmPassword('');
                setOtpSent(false);
                setOtpVerified(false);
                navigate('/');
            } else {
                // console.log(response);
                alert("There was an error updating your password. Please try again.");
            }
        } catch (err) {
            console.error("Error setting password:", err);
            alert("There was an error updating your password. Please try again.");
        } finally {
            setIsLoadingPassword(false); // Reset loading state after request completes
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>

            {!otpSent && !otpVerified && (
                <form onSubmit={handlePasswordReset}>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoadingEmail}
                        className={isLoadingEmail ? "disabled-btn" : ""}
                    >
                        {isLoadingEmail ? "Sending..." : "Send Password Reset Link"}
                    </button>
                </form>
            )}

            {/* OTP form: shown after email is submitted */}
            {otpSent && !otpVerified && (
                <form onSubmit={handleOtpVerification}>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter the OTP sent to your email"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoadingOtp}
                        className={isLoadingOtp ? "disabled-btn" : ""}
                    >
                        {isLoadingOtp ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            )}

            {/* Password reset form: shown after OTP is verified */}
            {otpVerified && (
                <form onSubmit={handlePasswordChange}>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoadingPassword}
                        className={isLoadingPassword ? "disabled-btn" : ""}
                    >
                        {isLoadingPassword ? "Updating..." : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
