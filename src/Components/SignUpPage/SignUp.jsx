import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
// import {useAuth} from './Components/auth/AuthContext';
import user_icon from "../../assets/user_icon.svg";
import mail_icon from "../../assets/mail_icon.svg";
import lock_icon from "../../assets/password-svgrepo-com.svg";
import call_icon from "../../assets/call_icon.svg";
import location_icon from "../../assets/location_icon.svg";
import user_role from "../../assets/user-role.svg";
import mainlog from "../../assets/mainlogo.png";
import { useAuth } from "../auth/AuthContext.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneNumberRegex=/^\d{10}$/;
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    ;



    if (!isLogin && !formData.username) {
      setError("Username is required");
      return;
    }

    if (!formData.email) {
      setError("Email is required");
      return;
    } else if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address (must contain 'manager', 'admin', or 'vet')");
      return;
    }
    
    if(!isLogin && !phoneNumberRegex.test(formData.phone_number)){
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!isLogin && !formData.password) {
      setError("Password is required");
      return;
    }
    
    if (!isLogin && !passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long and include at least one letter and one number.");
      return;
    }

    if (!isLogin && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    if (!isLogin && !formData.roles) {
      setError("Role is required");
      return;
    }

    if (!isLogin && !formData.confirm_password) {
      setError("Confirm Password is required");
      return;
    }

    setError("");

    try {
      let response;
      let data;

      if (!isLogin) {
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
            confirm_password: formData.confirm_password,
          }),
        });

        data = await response.json();

        if (!response.ok) {
          if (data.username) {
            setError(data.username[0]); // "A user with that username already exists."
            return;
          }
          if (data.email) {
            setError(data.email[0]); // "user with this email already exists."
            return;
          }
          setError(data.error || "Registration failed");
          return;
        }

        alert("Registration successful!");
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

        

        if (!response.ok) {
          setError(data.error || "Invalid email or password");
          return;
        }
        data = await response.json();
        const userRole=data.roles;
        // let role;
        // if (formData.email.includes("manager")) {
        //   role = "manager";
        // } else if (formData.email.includes("admin")) {
        //   role = "admin";
        // } else {
        //   role = "vet";
        // }

        // Set authentication state
        login(userRole);
         // Navigate based on role
      switch(userRole) {
        case 'manager':
          navigate('/dashboard-manager');
          break;
        case 'admin':
          navigate('/dashboard-admin');
          break;
        case 'veterinarian':
        case 'vet':
          navigate('/dashboard-vet');
          break;
        default:
          setError('Invalid role assigned');
          return;
      }

      // alert(data.message || "Login successful!");
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
          <div className="text">{isLogin ? "User Login" : "User Registration"}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {!isLogin && (
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

          {!isLogin && (
            <div className="input">
              <img src={user_role} alt="User Role Icon" />
              <select
                name="roles"
                className="role-select"
                value={formData.roles}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="manager">Manager</option>
                {/* <option value="admin">Admin</option> */}
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

          {!isLogin && (
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

        {error && <div className="error">{error}</div>}

        {/* {isLogin && (
          <div className="forgot-password">
            Forgot Password? <span>Click here</span>
          </div>
        )} */}

        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmit}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;