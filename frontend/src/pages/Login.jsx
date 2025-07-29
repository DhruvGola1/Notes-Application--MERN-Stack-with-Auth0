import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

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
    }
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");
    setPasswordError("");
    setShakeEmail(false);
    setShakePassword(false);

    let valid = true;

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

    if (!valid) {
      setTimeout(() => {
        setShakeEmail(false);
        setShakePassword(false);
      }, 500);
      return;
    }

    setLoading(true);

    try {
      await loginWithPopup({
        authorizationParams: {
          connection: "Username-Password-Authentication",
          login_hint: email,
        },
      });
    } catch (err) {
      console.error("Login failed:", err);
      setFormError(
        err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormError("");
    setLoading(true);
    try {
      await loginWithPopup({
        authorizationParams: {
          connection: "google-oauth2",
        },
      });
    } catch (err) {
      console.error("Google login failed:", err);
      setFormError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please login to continue</p>
        <form onSubmit={handleLogin} className="auth-form">
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
              placeholder="Enter your password"
              required
              className={passwordError ? "error-input" : ""}
            />
            {passwordError && (
              <span className="input-error-message">{passwordError}</span>
            )}
          </div>
          {formError && <p className="form-error-message">{formError}</p>}
          <button type="submit" disabled={loading} className="primary-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="redirect-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="redirect-link">
            Signup
          </span>
        </p>
        <div className="social-login-separator">OR</div>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="google-login-button"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
