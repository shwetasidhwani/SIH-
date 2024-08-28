import React, { useState } from "react";
import axios from "axios";
// import "./Signup.css";
import "../styles/global.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    reconfirm_password: "",
  });

  const [profilePicture , setProfilePicture] = useState(null);

  const handleChange = (e) => {
    if(e.target.name === "profilePicture"){
      setProfilePicture(e.target.files[0]);
    }
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("reconfirm_password", formValues.reconfirm_password);

    if (profilePicture){
      formData.append("profilePicture", profilePicture);
    }

    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type" : "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="signup-outercontainer">
        <div className="signup-innercontainer">
          <div className="signup-leftcontainer">
            <h1 id="signup-welcome-back">Welcome back to Station Sathi</h1>
            <Link to="/login">
              <button id="signuppage-login-btn">Log in</button>{" "}
            </Link>
          </div>

          <div className="signup-rightcontainer">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h1 id="signup-createanaccount">Create An Account</h1>


              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="signup-input-boxes"
              />

              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="signup-input-boxes"
              />

              <input
                type="password"
                name="reconfirm_password"
                value={formValues.reconfirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="signup-input-boxes"
              />

              <input type="file" accept="image/*" name = "profilePicture" onChange={handleChange} className="signup-input-boxes"/>

              <button type="submit" id="signup_btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
