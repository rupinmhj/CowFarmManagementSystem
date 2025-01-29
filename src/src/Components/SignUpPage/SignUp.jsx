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
    if (action === "Sign Up" && !formData.username) {
      setError("Username is required");
      return;
    }

    if (!formData.email) {
      setError("Email is required");
      return;
    } else if (!/^[a-zA-Z]+(?:[a-zA-Z]*manager|[a-zA-Z]*admin|[a-zA-Z]*vet)?@gmail\.com$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (action === "Sign Up" && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    if (action === "Sign Up" && !formData.roles) {
      setError("Role is required");
      return;
    }

    if (action === "Sign Up" && !formData.confirm_password) {
      setError("Confirm Password is required");
      return;
    }

    setError(""); // Clear any previous error messages

    // Log the data before making the API request
    console.log("Request Payload:", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      roles: formData.roles,
      phone_number: formData.phone_number,
      address: formData.address,
      confirm_password: formData.confirm_password, // Ensure this is sent as a string
    });

    try {
      let response;
      let data;

      if (action === "Sign Up") {
        // Sign Up API call
        response = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            roles: formData.roles,
            phone_number: formData.phone_number,
            address: formData.address,
            confirm_password: formData.confirm_password, // Add confirm_password to the request payload
          }),
        });

        data = await response.json();

        if (!response.ok) {
          console.log("Response Error:", data); // Log the error details
          setError(data.error || "Registration failed");
          return;
        }

        alert("Registration successful!");

        // Redirect based on email domain
        if (formData.email.includes("manager")) {
          navigate("/dashboard-manager");
        } else if (formData.email.includes("admin")) {
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-vet");
        }
      } else {
        // Login API call
        response = await fetch("http://127.0.0.1:8000/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        data = await response.json();

        if (!response.ok) {
          console.log("Response Error:", data); // Log the error details
          setError(data.error || "Invalid email or password");
          return;
        }

        // If login is successful, save token (optional)
        // localStorage.setItem('authToken', data.token); // Assuming the API returns a token
       
       
        alert("Login successful!");
        if (formData.email.includes("manager")) {
            navigate("/dashboard-manager");
          } else if (formData.email.includes("admin")) {
            navigate("/dashboard-admin");
          } else {
            navigate("/dashboard-vet");
          }
        
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="bodysigupcontainer">
       <div className="logocontainer">
        <img className="mainlog" src={mainlog} alt="" />
        <div className="heading firstheading">ERA Cow Farm</div>
        <div className="heading">Management System</div>
      </div>
        <div className="signUp-container">
      <div className="header">
        <div className="text">{action === "Sign Up" ? "User Registration" : "User Login"}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img className="icon" src={user_icon} alt="User Icon" />
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
              required
            >
              <option value="" disabled>
                Select Role
              </option>
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
        )}

        {action === "Sign Up" && (
          <>
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

      {error && <div className="error">{error}</div>}

      {action === "Login" && (
        <div className="forgot-password">
          Forgot Password? <span>Click here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={`submit ${action === "Login" ? "gray" : ""}`}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={`submit ${action === "Sign Up" ? "gray" : ""}`}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          {action}
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default SignUp;