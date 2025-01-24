import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import user_icon from "../../assets/user_icon.svg";
import mail_icon from "../../assets/mail_icon.svg";
import lock_icon from "../../assets/password-svgrepo-com.svg";
import call_icon from "../../assets/call_icon.svg";
import location_icon from "../../assets/location_icon.svg";
import user_role from "../../assets/user-role.svg";
import mainlog from "../../assets/mainlogo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    roles: "",
    phone_number: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Form validation
    if (action === "Sign Up") {
      if (!formData.username) {
        setError("Username is required");
        return;
      }
      if (!formData.roles) {
        setError("Please select a role");
        return;
      }
      if (formData.password !== formData.confirm_password) {
        setError("Passwords do not match");
        return;
      }
    }

    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    try {
      const endpoint =
        action === "Sign Up"
          ? "http://127.0.0.1:8000/api/register/"
          : "http://127.0.0.1:8000/api/login/";

      const requestBody =
        action === "Sign Up"
          ? {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              roles: formData.roles,
              phone_number: formData.phone_number,
              address: formData.address,
            }
          : {
              email: formData.email,
              password: formData.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `${action} failed`);
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      alert(`${action} successful!`);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const switchAction = (newAction) => {
    setAction(newAction);
    setError(""); // Clear any existing errors
    setFormData({
      // Reset form data
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      roles: "",
      phone_number: "",
      address: "",
    });
  };

  return (
    <div className="bodysignupcontainer">
      <div className="logocontainer">
        <img className="mainlog" src={mainlog} alt="" />
        <div className="heading firstheading" >ERA Cow Farm</div>
        <div className="heading" >Management System</div>
      </div>
      <div className="signUp-container">
        <div className="header">
          <div className="text">
            {action === "Sign Up" ? "User Registration" : "User Login"}
          </div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input
                name="username"
                placeholder="Username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="input">
            <img src={mail_icon} alt="Mail Icon" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {action === "Sign Up" && (
            <div className="input">
              <img src={user_role} alt="User Role Icon" />
              <select
                name="roles"
                className="role-select"
                value={formData.roles}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                <option value="veterinarian">Veterinarian</option>
              </select>
            </div>
          )}

          <div className="input">
            <img src={lock_icon} alt="Lock Icon" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {action === "Sign Up" && (
            <>
              <div className="input">
                <img src={lock_icon} alt="Lock Icon" />
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input">
                <img src={call_icon} alt="Call Icon" />
                <input
                  name="phone_number"
                  type="text"
                  placeholder="Contact No. (Optional)"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input">
                <img src={location_icon} alt="Location Icon" />
                <input
                  name="address"
                  type="text"
                  placeholder="Address (Optional)"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {action === "Login" && (
          <div className="forgot-password">
            Forgot Password? <span>Click here</span>
          </div>
        )}

        <div className="submit-container">
          <button
            className={`action-button ${action === "Login" ? "gray" : ""}`}
            onClick={() => switchAction("Sign Up")}
          >
            Sign Up
          </button>
          <button
            className={`action-button ${action === "Sign Up" ? "gray" : ""}`}
            onClick={() => switchAction("Login")}
          >
            Login
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
