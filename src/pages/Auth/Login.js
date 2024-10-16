import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if email and password match
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      toast.success("Connect successfully!");

      // Delay navigation for 1 second to allow the toast to be displayed
      setTimeout(() => {
        localStorage.setItem("auth", JSON.stringify({ email }));
        navigate(location.state || "/");
      }, 1000); // 1000ms = 1 second
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Layout title="Login - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Change type based on visibility state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
            {/* Eye Icon for toggling password visibility */}
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer"
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"} {/* Eye icons for show/hide */}
            </span>
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
