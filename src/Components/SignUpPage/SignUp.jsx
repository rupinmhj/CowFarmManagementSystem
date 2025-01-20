import React, { useState } from 'react';
import "./SignUp.css";
import user_icon from "../../assets/user_icon.svg";
import mail_icon from "../../assets/mail_icon.svg";
import lock_icon from "../../assets/password-svgrepo-com.svg";
import call_icon from "../../assets/call_icon.svg";
import location_icon from "../../assets/location_icon.svg";
import user_role from "../../assets/user-role.svg";


const SignUp = () => {

    const [action,setAction]=useState("Sign Up");
    const [username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit=()=>{
        if(action=="Sign Up"&&!username){
            setError("Username is required");
            return;
        }

        if (!email) {
            setError("Email is required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {   //The test() function is a method in JavaScript's RegExp (Regular Expression) object. 
            setError("Please enter a valid email address");
        } else {
            setError(""); // Clear error if email is valid
        }
        
    }

  return (
   <div className="container">
    <div className="header">
    {action==="Sign Up"?<div></div>:<div className="text">User Login</div>}
    {action==="Login"?<div></div>:<div className="text">User Registration</div>}   
            
        
        <div className="underline"></div>
    </div>
        <div className="inputs">
        {action==="Login"?<div></div>:<div className="input">
                <img className="icon icon-img" src={user_icon} alt="" />
                <input placeholder="Username" type="text" />
            </div>}
            
            <div className="input">
                <img src={mail_icon} alt="" />
                <input type="email" placeholder="Email"/>
            </div>
            {action==="Login"?<div></div>: <div className="input">
            <img src={user_role} alt="" />
    <select className="role-select">
        <option value="" disabled selected>
            Select Role
        </option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
        <option value="veterinarian">veterinarian</option>
    </select>
</div>}
           

            <div className="input">
                <img src={lock_icon} alt="" />
                <input type="password" placeholder="Password" />
            </div>
            {action==="Login"?<div></div>: <div className="input">
                <img src={lock_icon} alt="" />
                <input type="password" placeholder="Confirm password"/>
            </div>}
           
            {action==="Login"?<div></div>:<div className="input">
                <img src={call_icon} alt="" />
                <input type="text" placeholder="Contact No.(optional)"/>
            </div>}
            
            {action==="Login"?<div></div>:<div className="input">
            <img src={location_icon} alt="" />
                <input type="Address" placeholder="Address (Optional)"/>
            </div>}
            
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click here</span></div>}
        
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  );
};

export default SignUp;
