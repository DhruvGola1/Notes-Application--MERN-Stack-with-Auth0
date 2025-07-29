import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [shakeName, setShakeName] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [shakeConfirmPassword, setShakeConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      return "Password needs an uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      return "Password needs a lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      return "Password needs a number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password needs a special character.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setShakeName(false);
    setShakeEmail(false);
    setShakePassword(false);
    setShakeConfirmPassword(false);
    setSuccessMessage("");

    let valid = true;

    const nameErrMsg = validateName(name);
    if (nameErrMsg) {
      setNameError(nameErrMsg);
      setShakeName(true);
      valid = false;
    }

    const emailErrMsg = validateEmail(email);
    if (emailErrMsg) {
      setEmailError(emailErrMsg);
      setShakeEmail(true);
      valid = false;
    }

    const passwordErrMsg = validatePassword(password);
    if (passwordErrMsg) {
      setPasswordError(passwordErrMsg);
      setShakePassword(true);
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setShakeConfirmPassword(true);
      valid = false;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      setShakeConfirmPassword(true);
      valid = false;
    }

    if (!valid) {
      setTimeout(() => {
        setShakeName(false);
        setShakeEmail(false);
        setShakePassword(false);
        setShakeConfirmPassword(false);
      }, 500);
      return;
    }

    setLoading(true);

    try {
      await loginWithPopup({
        authorizationParams: {
          connection: "Username-Password-Authentication",
          screen_hint: "signup",
          login_hint: email,
        },
      });

      setSuccessMessage(
        "Account created successfully! Redirecting to dashboard..."
      );
    } catch (err) {
      console.error("Signup failed:", err);
      setFormError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setFormError("");
    setLoading(true);
    try {
      await loginWithPopup({
        authorizationParams: {
          connection: "google-oauth2",
          screen_hint: "signup",
        },
      });
    } catch (err) {
      console.error("Google signup failed:", err);
      setFormError(err.message || "Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Signup to get started</p>
        <form onSubmit={handleSignup} className="auth-form">
          <div
            className={`input-group ${nameError ? "error" : ""} ${
              shakeName ? "shake" : ""
            }`}
          >
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
                setShakeName(false);
              }}
              placeholder="Enter your name"
              required
              className={nameError ? "error-input" : ""}
            />
            {nameError && (
              <span className="input-error-message">{nameError}</span>
            )}
          </div>
          <div
            className={`input-group ${emailError ? "error" : ""} ${
              shakeEmail ? "shake" : ""
            }`}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setShakeEmail(false);
              }}
              placeholder="Enter your email"
              required
              className={emailError ? "error-input" : ""}
            />
            {emailError && (
              <span className="input-error-message">{emailError}</span>
            )}
          </div>
          <div
            className={`input-group ${passwordError ? "error" : ""} ${
              shakePassword ? "shake" : ""
            }`}
          >
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setShakePassword(false);
              }}
              placeholder="Enter a password"
              required
              className={passwordError ? "error-input" : ""}
            />
            {passwordError && (
              <span className="input-error-message">{passwordError}</span>
            )}
          </div>
          <div
            className={`input-group ${confirmPasswordError ? "error" : ""} ${
              shakeConfirmPassword ? "shake" : ""
            }`}
          >
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
                setShakeConfirmPassword(false);
              }}
              placeholder="Confirm your password"
              required
              className={confirmPasswordError ? "error-input" : ""}
            />
            {confirmPasswordError && (
              <span className="input-error-message">
                {confirmPasswordError}
              </span>
            )}
          </div>
          {formError && <p className="form-error-message">{formError}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button type="submit" disabled={loading} className="primary-button">
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p className="redirect-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")} className="redirect-link">
            Login
          </span>
        </p>
        <div className="social-login-separator">OR</div>
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="google-login-button"
        >
          Signup with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
